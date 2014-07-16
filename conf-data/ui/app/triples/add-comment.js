(function () {

  'use strict';

  var module = angular.module('sample.triples');

  module.directive('addComment', [function () {
    return {
      restrict: 'E',
      scope: {
        authenticated: '=authenticated',
        addModel: '=addModel',
        save: '&save'
      },
      templateUrl: '/triples/add-comment.html',
      link: function($scope) {

      }
    };
  }]);
}());
