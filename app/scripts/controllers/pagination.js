(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name decaturApp.controller:AboutCtrl
	 * @description
	 * # AboutCtrl
	 * Controller of the decaturApp
	 */
	angular.module('complianceApp')
	  .controller('PaginationCtrl', ['$scope', 

	  	function ($scope) {

		  	$scope.nextPage = function (link) {
		  		console.log(link);
		  	};

	  	} // end function block
	  	
	  ]); // end controller

}()); // end iif