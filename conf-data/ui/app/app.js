
angular.module('sample', [
  'ngRoute', 'ngCkeditor', 'sample.user', 'sample.search', 'sample.common', 'sample.detail',
  'ui.bootstrap', 'gd.ui.jsonexplorer', 'sample.create', 'sample.conferences', 'sample.conference',
  'sample.triples', 'sample.person', 'sample.paper', 'sample.comments', 'sample.persons', 'sample.papers'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    'use strict';

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/search/search.html'
      })
      .when('/create', {
        templateUrl: '/create/create.html',
        controller: 'CreateCtrl'
      })
      .when('/detail', {
        templateUrl: '/detail/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/profile', {
        templateUrl: '/user/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/conferences', {
        templateUrl: '/conferences/conferences.html',
        controller: 'ConferencesCtrl'
      })
      .when('/conference', {
        templateUrl: '/conference/conference.html',
        controller: 'ConferenceCtrl'
      })
      .when('/triples', {
        templateUrl: '/triples/triples.html',
        controller: 'TriplesCtrl'
      })
      .when('/person', {
        templateUrl: '/person/person.html',
        controller: 'PersonCtrl'
      })
      .when('/paper', {
        templateUrl: '/paper/paper.html',
        controller: 'PaperCtrl'
      })
      .when('/comments', {
        templateUrl: '/comments/comments.html',
        controller: 'CommentsCtrl'
      })
      .when('/persons', {
        templateUrl: '/persons/persons.html',
        controller: 'PersonsCtrl'
      })
      .when('/papers', {
        templateUrl: '/papers/papers.html',
        controller: 'PapersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
