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
        mbox: '',
        roles: [],
        paperDetails: []
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
          // Person does not have any special characters in their name
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
      mlRest.getRoles(person,{ format: 'json' }).then(function(response) {
        if(!jQuery.isArray(response.data))
          model.roles = [response.data];
        else
          model.roles = response.data
      });
      mlRest.getPersonDetail(person, { format: 'json' }).then(function(response) {
        model.detail = response.data;
        // The person may not be an author, so the data is a string "null"
        if(response.data !== "null") {
          // The person may only have one coauthor
          if (!jQuery.isArray(response.data))
            model.confData = [response.data];
          else
            model.confData = response.data;

          // Sort the array by the paper's IRI
          model.confData.sort(function (a, b) {
            var a1 = a.pub, b1 = b.pub;
            if (a1 == b1) return 0;
            return a1 > b1 ? 1 : -1;
          });

          // Now collapse the triples
          var prev = '';
          var paperDetail = '';
          for (var i = 0; i < model.confData.length; i++) {
            if (prev !== model.confData[i].pub) {
              // Save the last one you built up, but not the first one that's empty
              if (paperDetail)
                model.paperDetails.push(paperDetail);
              // Then start a new one
              paperDetail = {
                title: model.confData[i].title,
                iri: model.confData[i].pub,
                authors: []
              }
            }
            var coauthor = {
              name: model.confData[i].coauthorname,
              iri: model.confData[i].coauthor
            }
            paperDetail.authors.push(coauthor);
            prev = model.confData[i].pub;
          }
          // Add the last one on that was built
          model.paperDetails.push(paperDetail);
        }
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());

