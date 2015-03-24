(function () {
	'use strict'

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for analysis page
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')

		.controller('AnalysisCtrl', ['$scope', '$location', 'DashboardFactory', 'AnalysisFactory', '$rootScope',

			function ($scope, $location, DashboardFactory, AnalysisFactory, $rootScope) {
				
				$scope.backHome = function () {
					$rootScope.$broadcast('feed-loaded');
					$location.path('/');
				};

				$scope.dataAnalysis = AnalysisFactory.getStories();

				// console.log($scope.data);

			} // end function block

		]); // end controller

}()); // end iife