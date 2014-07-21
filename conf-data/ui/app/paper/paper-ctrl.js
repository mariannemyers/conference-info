(function () {
  'use strict';

  angular.module('sample.paper')
    .controller('PaperCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var paper = $routeParams.iri;
      var model = {
        // your model stuff here
        detail: {},
        paper: paper,
        title: '',
        authors: [],
        month: '',
        year: '',
        hashtag: ''
      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getPaper(paper, { format: 'json' }).then(function(response) {
        model.detail = response.data;
          if(response.data instanceof Array) {
            // TODO: Is this the right way, or is my query wrong? mgm
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
            'author' : response.author,
            'authorName' : response.authorname
          });
        }
       });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

