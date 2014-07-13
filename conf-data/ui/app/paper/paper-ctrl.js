(function () {
  'use strict';

  angular.module('sample.conference')
    .controller('PaperCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var graph = $routeParams.s;
      var model = {
        // your model stuff here
        detail: {},
        papers: {},
        s: s
      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getConference(s, { format: 'json' }).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.papers = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

