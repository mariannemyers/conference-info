(function () {
  'use strict';

  angular.module('sample.conference')
    .controller('ConferenceCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var graph = $routeParams.graph;
      var model = {
        // your model stuff here
        detail: {},
        papers: {},
        graph: graph,
        user: user
      };

      mlRest.getConference(graph).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.papers = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

