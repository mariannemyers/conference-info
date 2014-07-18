(function () {
  'use strict';

  angular.module('sample.person')
    .controller('PersonCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var person = $routeParams.person;
      var model = {
        // your model stuff here
        detail: {},
        confData : {},
        person: person,
        name: '',
        basedNear: '',
        depiction: '',
        affiliation: '',
        mbox: ''

      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getPerson(person).then(function(response) {
        model.name = response.data.name;
        model.basedNear = response.data.based_near;
        model.depiction = response.data.depiction;
        model.mbox = response.data.mbox;
      });
      mlRest.getPersonDetail(person, { format: 'json' }).then(function(response) {
      //mlRest.callExtension('conferences', settings).then(function(response) {
        model.detail = response.data;
        model.confData = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

