(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name decaturApp
   * @description
   * # decaturApp
   *
   * Main module of the application.
   */
  angular
    .module('decaturApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute'
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
        .otherwise({ redirectTo: '/'});

         // use the HTML5 History API
        // $locationProvider.html5Mode(true);

    }); // end config

}()); // end iife