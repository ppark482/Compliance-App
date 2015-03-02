(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name decaturApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the decaturApp
	 */
	angular.module('decaturApp')
	  .controller('MainCtrl', ['$scope', 'YelpApi', '$window', '$rootScope', '$http', 'AjcFeed',
	  	function ($scope, YelpApi, $window, $rootScope, $http, AjcFeed) {

	  	AjcFeed.loadFeed().then(function (results) {
	  		$scope.ajc = results.feed.entries;
	  	});

	  	YelpApi.retrieveYelp('', function (data) {
	  		$window.restaurants = data.businesses;
	  		$scope.restaurants = $window.restaurants;
	  		// console.log($scope.restaurants);
	  	});

	  	} // end function block

	  ]); // end controller

}()); // end iife