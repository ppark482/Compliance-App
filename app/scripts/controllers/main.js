(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name decaturApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the decaturApp
	 */
	angular.module('complianceApp')
	  .controller('MainCtrl', ['$scope', '$window', '$rootScope', '$http', 'MapiFactory',
	  	function ($scope, $window, $rootScope, $http, MapiFactory) {

	  		MapiFactory.getData().then( function (data) {
	  			console.log(data);
	  			$scope.authorData = data.entities;
	  		});

	  		$scope.linkItems = [	  			
	  			'Helena Oliviero',
					'John Kessler',
					'Shelia Poole',
					'Howard Pousner',
					'Bob Townsend',
					'Jill Vejnoska',
					'Gracie Bonds Staples',
					'Nedra Rhone',
					'Bo Emerson',
					'Mark Davis',
					'Lori Johnston',
					'H.M. Cauley',
					'Michelle C. Brooks'
					]

	  	} // end function block

	  ]); // end controller

}()); // end iife