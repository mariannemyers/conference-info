(function () {

  'use strict';

  var module = angular.module('sample.comments');

  module.directive('addComment', [function () {
    return {
      restrict: 'E',
      scope: {
        authenticated: '=authenticated',
        addModel: '=addModel',
        save: '&save'
      },
      templateUrl: '/comments/add-comment.html',
      link: function($scope) {

      }
    };
  }]);
}());
