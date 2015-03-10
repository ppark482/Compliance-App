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
	  .controller('MainCtrl', ['$scope', '$window', '$rootScope', '$http', 'MapiFactory', '$filter',
	  	function ($scope, $window, $rootScope, $http, MapiFactory, $filter) {

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

	  		// Gets Data For Selected Author
				$scope.selectedQuery = function (name) {
					MapiFactory.getData(name).then( function (data) {
						console.log(data);
						scopeEm(data);
						$scope.searchAuthorName = {} && '';
						$scope.searchAuthorForm.$setPristine();
					})
				};

				// Gets Data For Inputted Text
				$scope.searchByQuery = function (query) {
					console.log(query);
					MapiFactory.getTextData(query).then( function (data) {
						console.log(data);
						scopeEm(data);
	  				$scope.queryString = {} && '';
	  				$scope.searchForm.$setPristine();
					})
				};

				// Gets Next or Previous Page
				$scope.nextPage = function (url) {
					console.log(url);
					MapiFactory.getNextPage(url).then( function (data) {
						console.log(data);
						scopeEm(data);
					})
				};

				// Controls the Modified By Order
				var orderBy = $filter('orderBy');

				$scope.order = function (predicate, reverse) {
					$scope.authorData = orderBy($scope.authorData, predicate, reverse);
				};

				$scope.order('-content_modified', false);

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