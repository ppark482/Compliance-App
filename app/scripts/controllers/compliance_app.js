(function(){ 

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for side bar and nav bar
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')

		.controller('ComplianceAppCtrl', ['$scope', '$location', 'DashboardFactory', '$rootScope',

			function ($scope, $location, DashboardFactory, $rootScope) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				$scope.today = DashboardFactory.getTheDate();

				$rootScope.$on('feed-loaded', function () {
					$scope.resultsCount 		= DashboardFactory.getResultsCount();
					$scope.timeSince 				= DashboardFactory.getTimeSince();
					// Modifies counts on left bar
					var providerCounts 			= DashboardFactory.getSidebarCounts();
					$scope.ajcStories 			= providerCounts.ajc_stories;
					$scope.photo_galleries 	= providerCounts.photo_galleries;
					$scope.wp_vip 					= providerCounts.wp_vip;
					$scope.publish_this 		= providerCounts.publish_this;
					$scope.ap_stories 			= providerCounts.ap_stories;
				});

				$scope.getTodaysFeed = function () {
					$rootScope.$broadcast('get-feed');
				};

			} // end function block

		]); // end controller

}()); // end iife