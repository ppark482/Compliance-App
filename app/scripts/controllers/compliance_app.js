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
					$scope.resultsCount = DashboardFactory.getResultsCount();
					$scope.timeSince = DashboardFactory.getTimeSince();
					// Modifies counts on left bar
					var providerCounts = DashboardFactory.getSidebarCounts();
					$scope.ajcStories 			= providerCounts.ajc_stories;
					$scope.photo_galleries 	= providerCounts.photo_galleries;
					$scope.wp_vip 					= providerCounts.wp_vip;
					$scope.publish_this 		= providerCounts.publish_this;
					$scope.ap_stories 			= providerCounts.ap_stories;
				});

				$scope.getTodaysFeed = function () {
					$rootScope.$broadcast('get-feed');
				};

				$scope.pickDateOptions = {
					max: new Date(),
					onClose: function () {
						console.log($scope.date);
						$scope.date = new Date ($scope.date);
						console.log($scope.date);
						var start = $scope.date;
						start.setHours(04, 00, 00, 00);
						start.toISOString();
						console.log(start);
						// var start = $scope.date.setHours(04, 00, 00, 00);
						// console.log(start);
						// var newDate = $scope.date.getDate() - 1;
						// console.log(newDate);
						// var endDate = $scope.date.setDate(newDate);
						// endDate = new Date(endDate).toISOString();
						// console.log(endDate);

						// var end = $scope.date.setHours(03, 59, 59, 59);
						// console.log(end);
					}
				};

			} // end function block

		]); // end controller

}()); // end iife