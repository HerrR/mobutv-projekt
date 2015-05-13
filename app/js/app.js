var suckMyProject = angular.module('suckMyProject', ['ngRoute','ngResource']);
suckMyProject.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/top', {
        templateUrl: 'partials/top.html',
        controller: 'TopCtrl'
      }).
      when('/near', {
        templateUrl: 'partials/near.html',
        controller: 'NearCtrl'
      }).
      otherwise({
        redirectTo: '/top'
      });
  }])