(function () {
  'use strict';

  angular.module('sample.persons')
    .controller('PersonsCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var model = {
        // your model stuff here
        detail: {},
        persons: {},
        user: user
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

