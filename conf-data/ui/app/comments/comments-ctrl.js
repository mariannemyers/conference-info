(function () {
  'use strict';

  angular.module('sample.comments')
    // May need to pass down the user here.
    .controller('CommentsCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
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
        iri: iri,
        comments: [],
        additionalComment: commentModel,
        user: user
      };

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
          model.comments = response.comments;
      });

      angular.extend($scope, {
        model: model,

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

        addComment: function(comment) {
          // add comments array if it doesn't exist
          // this is for demos created before adding comments
          if (typeof $scope.model.comments === 'undefined') {
            $scope.insertField('', {'comments':[]},'last-child');
            $scope.model.comments = [];
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
          $scope.model[arrayName].push(item);
        },

        resetCommentForm: function(result) {
          // add the comment to the model to update UI
          $scope.addToDemoArray('comments',result);
          $scope.model.additionalComment.msg = '';
        }
      });
    }]);
}());

