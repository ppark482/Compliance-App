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
      'cgBusy'
    ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapCtrl'
        })
        .when('/search', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({});

    }); // end config

}()); // end iife