(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name decaturApp
   * @description
   * # complianceApp
   *
   * Main module of the application.
   */
  angular
    .module('complianceApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'mm.foundation',
      'angular-loading-bar'
    ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({});

    }); // end config

}()); // end iife