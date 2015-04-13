(function () { 

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for dashboard
		- handles loading / auto loading of feed 
		- date picker
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')

		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory', '$rootScope', '$route', 'AnalysisFactory',

			function ($scope, $location, DashboardFactory, MapiFactory, $rootScope, $route, AnalysisFactory) {

				var autoLoad;

				$rootScope.$on('get-feed', function () {
					getTodaysFeed();
				});

				$scope.getSelectedDate = function () {
					DashboardFactory.selectedDates($scope.date);
					DashboardFactory.sendCount(0);
					getTodaysFeed();
				};

				// Gets initial round of data
				var getTodaysFeed = function () {
					DashboardFactory.getAJCstories().then( function (data) {
						// data is filtered before being passed to DashboardCtrl
						$rootScope.stories = data.entities;
						$rootScope.pages = data.links;
						DashboardFactory.sendCount($rootScope.stories.length);
						// modifyCounts($scope.stories);
						autoLoad(data);
					});
				};

				// Counts for autoLoad
				var aLcount = 2;
				var sharedCount = [];

				// Auto Load next set of data until end of date range
				var autoLoad = function (data) {
					$scope.busy = MapiFactory.getNextPage(data.links[1].href).then( function (data) {
							var newData = DashboardFactory.filterResults(data);
							angular.forEach(newData.entities, function (x) {
								$scope.stories.push(x);
							});
							// count for objects outside of atlanta properties
							sharedCount.push(newData.sharedCount);
							$scope.sharedCount = _.reduce(sharedCount, function (a,b) { return a + b }, 0);
							// removes duplicate links
							$scope.stories = _.unique($scope.stories); 
							console.log($scope.stories);
							$rootScope.stories = $scope.stories;
							// AnalysisFactory.sendStories($scope.stories);
							$rootScope.pages = newData.links;
							// keeping track of the time since:
							if($scope.stories.length !== 0) {
								DashboardFactory.sendTimeSince($scope.stories[$scope.stories.length - 1].pub_date);
							}
						// keeping track of the results count
						DashboardFactory.sendCount($rootScope.stories.length);
						// keeping track of the number of stories
						// stories for each provider category
						DashboardFactory.modifyCounts($rootScope.stories);
						$scope.displayBreakdown = DashboardFactory.getSidebarCounts();
						console.log($scope.displayBreakdown);
						// console.log($scope.stories);
						$rootScope.$broadcast('feed-loaded');
						// starts loop
						aLcount++;
						// aLcount defines number of pagination calls
						// because api only returns 25 per page
						if(aLcount < 200) {
							autoLoad(data);
						} else {
							aLcount = 2;
							console.log($rootScope.stories);
						}
					}); // end spinner wrap
				}; // end autoLoad

			} // end function block

		]);

}()); // end iife