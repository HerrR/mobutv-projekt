var suckMyProject = angular.module('suckMyProject', ['ngRoute','ngResource','ngTouch']);
suckMyProject.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/top', {
        templateUrl: 'partials/top.html',
        controller: 'TopCtrl'
      }).
      otherwise({
        redirectTo: '/top'
      });
  }])