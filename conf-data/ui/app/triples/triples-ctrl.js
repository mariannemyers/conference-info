(function () {
  'use strict';

  angular.module('sample.triples')
    .controller('TriplesCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var iri = $routeParams.iri;
      var model = {
        // your model stuff here
        detail: {},
        triples: {},
        iri: iri
      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getTriples(iri, { format: 'json' }).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.triples = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

