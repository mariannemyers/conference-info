(function () {
  'use strict';

  angular.module('sample.persons')
    .controller('PersonsCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var model = {
        // your model stuff here
        detail: {},
        persons: {}
      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getPersons({ format: 'json' }).then(function(response) {
        model.detail = response.data;
        model.persons = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

