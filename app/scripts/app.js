(function () {

  'use strict';

/*//////////////////////////////////////////////////////////////////////////////
// 
// App module initializer / router
// 
//////////////////////////////////////////////////////////////////////////////*/

  angular.module('complianceApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'mm.foundation',
      'cgBusy',
      'mp.datePicker'
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
        .when('/analysis', {
          templateUrl: 'views/analysis.html',
          controller: 'AnalysisCtrl'
        })
        .otherwise({});

    }); // end config

}()); // end iife