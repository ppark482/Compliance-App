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
      'cgBusy',
      'angular-datepicker'
    ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/details', {
          templateUrl: 'views/details.html',
          controller: 'DetailsCtrl'
        })
        .when('/search', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({});

    }); // end config

}()); // end iife