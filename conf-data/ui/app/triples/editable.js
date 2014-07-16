(function () {

  'use strict';

  var module = angular.module('sample.triples');

  module.directive('editable', ['$timeout',function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        enabled: '=enabled',
        editType: '@editType',
        editModel: '=editModel',
        save: '&save',
        editOptions: '=editOptions',
        richTextOptions: '=',
        prefix: '@prefix'
      },

      templateUrl: '/triples/editable.html',

      link: function($scope) {
        $scope.mode = 'view';
        $scope.delayedSave = function() {
          $timeout(
            function () {
              $scope.save();
            },
            0
          );
        };
      }
    };
  }]);
}());
