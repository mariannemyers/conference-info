(function () {
  'use strict';

  angular.module('sample.conferences')
    .controller('ConferencesCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var model = {
        // your model stuff here
        detail: {},
        conferences: {},
        user: user
      };

      function getConferences(){
        mlRest.getConferences().then(function(response) {
          model.detail = response.data;
          model.conferences = response.data.conferences;
        });
      }

      getConferences();

      angular.extend($scope, {
        model: model

      });

      $scope.$watch('model.user.authenticated', function(newValue, oldValue) {
        // The user logged in.
        getConferences();
      });
    }]);
}());

