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
					];

				var scopeEm = function (data) {
						$scope.authorData = {};
						$scope.pages = {};
						$scope.authorData = data.entities;
	  				$scope.pages = data.links;
	  			};

				$scope.selectedQuery = function (name) {
					MapiFactory.getData(name).then( function (data) {
						console.log(data);
						scopeEm(data);
					})
				};

				$scope.searchByQuery = function (query) {
					console.log(query);
					MapiFactory.getTextData(query).then( function (data) {
						console.log(data);
						scopeEm(data);
	  				$scope.queryString = {} && '';
	  				$scope.searchForm.$setPristine();
					})
				};

				$scope.getPuppies = function () {
					MapiFactory.getPuppies().then( function (data) {
						console.log(data);
					})
				};

	  	} // end function block

	  ]) // end controller

	  .directive('stopEvent', function () {

	  	return {
	  		restrict: 'A',
	  		link: function (scope, element, attr) {
	  			element.bind('click', function (e) {
	  				e.stopPropagation();
	  			});
	  		}
	  	};

	  }); // end directive

}()); // end iife