(function () {
  'use strict';

  angular.module('sample.triples')
    // May need to pass down the user here.
    .controller('TriplesCtrl', ['$scope', 'MLRest', 'User', '$routeParams', function ($scope, mlRest, user, $routeParams) {
      var iri = $routeParams.iri;
      var uri = "/comments/" + iri;

      var model = {
        // your model stuff here
        detail: {},
        triples: {},
        iri: iri,
        user: user
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

