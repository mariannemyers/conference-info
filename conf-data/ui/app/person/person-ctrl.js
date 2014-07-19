(function () {
  'use strict';

  angular.module('sample.person')
    .controller('PersonCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var person = $routeParams.person;
      var model = {
        // your model stuff here
        detail: {},
        confData : [],
        person: person,
        name: '',
        basedNear: 'No details provided',
        depiction: '/images/profile_placeholder-240x280.png',
        affiliation: 'No details provided',
        mbox: 'none'

      };
      var settings = {
        'method':'GET',
        'data': 'application/json',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      mlRest.getPerson(person).then(function(response) {
        // TODO: Mr. Troncy has two names.  Handle this case.
        model.name = response.data.name;
        if(response.data.based_near) {
          model.basedNear = response.data.based_near;
        }
        if(response.data.depiction) {
          model.depiction = response.data.depiction;
        }
        if(response.data.mbox) {
          model.mbox = response.data.mbox;
        }
      });
      mlRest.getPersonDetail(person, { format: 'json' }).then(function(response) {
        model.detail = response.data;
        if (!jQuery.isArray(response.data))
          model.confData = [response.data];
        else
          model.confData = response.data;
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

