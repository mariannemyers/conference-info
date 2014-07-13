(function () {
  'use strict';

  angular.module('sample.triples')
    // May need to pass down the user here.
    .controller('TriplesCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var iri = $routeParams.iri;
      var uri = "/comments/" + iri;
      var commentModel =
      {
        // set by model binding
        msg:'',
        // the values below are set server-side
        id: null,
        username: null,
        dateTime: null
      };
      var model = {
        // your model stuff here
        detail: {},
        triples: {},
        iri: iri,
        demo: {
          comments:[],
          bugs:[]
        },
        additionalComment: commentModel,
        user: user
      };

      mlRest.getTriples(iri, { format: 'json' }).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.triples = response.data;
      });

      mlRest.callExtension('comment',
        {
          method: 'GET',
          params: {
            'rs:uri': uri
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(response) {
          model.demo.comments = response.comments;
      });

      angular.extend($scope, {
        model: model,

        showBugForm: false,

        showClosedBugs: false,

        saveField: function(field, value) {
          var content = {};
          content[field] = value;
          mlRest.patch(
            uri,
            {
              'patch': [
                {
                  'replace-insert': {
                    'select': '$.' + field,
                    'content': content,
                    'context': '$',
                    'position': 'last-child'
                  }
                }
              ]
            }
          );
          model.edit = '';
        },

        // call to add to an array field
        //
        addToField: function(field, value, finalFunction) {
          $scope.insertField('.' + field,value,'last-child',finalFunction);
        },

        // this adds a field to a doc
        insertField: function(pathFromDoc, value, position, finalFunction) {
          mlRest.patch(
            uri,
            {
              'patch': [
                {
                  'insert': {
                    'context': '$' + pathFromDoc,
                    'position': position,
                    'content': value
                  }
                }
              ]
            }
          ).finally(finalFunction);
        },

        deleteItem: function(type, item) {
          // delete item from server
          mlRest.callExtension(type,
            {
              method: 'DELETE',
              params: {
                'rs:uri': uri,
                'rs:id': item.id
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
            .then(function() {item = null;});
        },

        addBug: function(bug) {
          // add comments array if it doesn't exist
          // this is for demos created before adding comments
          if (typeof $scope.model.demo.bugs === 'undefined') {
            $scope.insertField('', {'bugs':[]},'last-child');
            $scope.model.demo.bugs = [];
          }
          // send comment to server
          // reset the comment form after the comment is sent
          mlRest.callExtension('file-bug',
            {
              method: 'POST',
              data: bug,
              params: {
                'rs:uri': uri
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ).then(
            function(result){
              $scope.addToDemoArray('bugs',result);
              $scope.model.additionalBug.msg = '';
              $scope.model.additionalBug.browser = '';
            }
          );
        },

        addComment: function(comment) {
          // add comments array if it doesn't exist
          // this is for demos created before adding comments
          if (typeof $scope.model.demo.comments === 'undefined') {
            $scope.insertField('', {'comments':[]},'last-child');
            $scope.model.demo.comments = [];
          }
          // send comment to server
          // reset the comment form after the comment is sent
          mlRest.callExtension('comment',
            {
              method: 'POST',
              data: comment,
              params: {
                'rs:uri': uri
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
            .then($scope.resetCommentForm);
        },

        updateItemInArray: function(extensionName, itemId, propertyName, propertyValue) {
          // make call to extension with item id
          mlRest.callExtension(extensionName,
            {
              method: 'PUT',
              data: { 'value':propertyValue },
              params: {
                'rs:uri': uri,
                'rs:id': itemId,
                'rs:property':propertyName
              },
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
        },

        addToDemoArray: function(arrayName, item) {
          $scope.model.demo[arrayName].push(item);
        },

        resetCommentForm: function(result) {
          // add the comment to the demo model to update UI
          $scope.addToDemoArray('comments',result);
          $scope.model.additionalComment.msg = '';
        }
      });
    }]);
}());

