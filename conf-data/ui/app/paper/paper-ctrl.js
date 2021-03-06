(function () {
  'use strict';

  angular.module('sample.paper')
    .controller('PaperCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var paper = $routeParams.iri;
      var model = {
        // your model stuff here
        detail: {},
        paper: paper,
        title: '',
        authors: [],
        month: '',
        year: '',
        hashtag: '',
        user: user
      };

      mlRest.getPaper(paper).then(function(response) {
        model.detail = response.data;
          if(response.data instanceof Array) {
            model.title = response.data[0].title;
            model.month = response.data[0].month;
            model.year = response.data[0].year;
            if(response.data[0].hashtag !== null) {
              model.hashtag = response.data[0].hashtag;
              if(model.hashtag.indexOf('#') > -1){
                model.hashtag = model.hashtag.replace('#', '');
              }
            }
            response.data.forEach(function(entry) {
              model.authors.push( {
                'author' : entry.author,
                'authorName' : entry.authorname
              });
            });
        }
        else {
          model.title = response.data.title;
          model.month = response.data.month;
          model.year = response.data.year;
          if(response.data.hashtag !== null) {
            model.hashtag = response.data.hashtag;
            if(model.hashtag.indexOf('#') > -1){
              model.hashtag = model.hashtag.replace('#', '');
            }
          }
          model.authors.push( {
            'author' : response.data.author,
            'authorName' : response.data.authorname
          });
        }
       });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

