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

				var pieChart = AnalysisFactory.getPieChart();

				console.log(pieChart);

				angular.element('#pie-chart').highcharts(pieChart);

				console.log($scope.dataAnalysis);


				// console.log($scope.data);

			} // end function block

		]); // end controller

}()); // end iife