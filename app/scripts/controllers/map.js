(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name decaturApp.controller:AboutCtrl
	 * @description
	 * # AboutCtrl
	 * Controller of the decaturApp
	 */
	angular.module('decaturApp')
	  .controller('MapCtrl', ['$scope', '$rootScope',
	  	function ($scope, $rootScope) {


	  		console.log('MapCtrl');

	  		$scope.repopulate = function () {
	  			$rootScope.$broadcast('back-home');
	  		};


	  	}

	  ]); // end controller

}()); // end iif