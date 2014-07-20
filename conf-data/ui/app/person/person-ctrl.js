(function () {
  'use strict';

  angular.module('sample.person')
    .controller('PersonCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var person = $routeParams.iri;
      var model = {
        // your model stuff here
        detail: {},
        confData : [],
        person: person,
        name: '',
        basedNear: 'No details provided',
        depiction: '/images/profile_placeholder-240x280.png',
        affiliation: 'No details provided',
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
        // Some people have "two" names - Raphael Troncy and Raphaël Troncy
        if(jQuery.isArray(response.data)) {
          // Use the first set of name information to populate the page
          model.name = response.data[0].name;
          if(response.data[0].based_near) {
            model.basedNear = response.data[0].based_near;
          }
          if(response.data[0].depiction) {
            model.depiction = response.data[0].depiction;
          }
          if(response.data[0].mbox) {
            model.mbox = response.data[0].mbox;
          }
        }
        else {
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

