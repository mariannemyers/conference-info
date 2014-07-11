(function () {
  'use strict';

  angular.module('sample.conferences')
    .controller('ConferencesCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var model = {
        // your model stuff here
        detail: {},
        conferences: {}
      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getConferences( { format: 'json' }).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.conferences = response.data.conferences;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

