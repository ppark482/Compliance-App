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

				$scope.pickDateOptions = {
					max: new Date(),
					onClose: function () {
						var passMe = $scope.date;
						DashboardFactory.selectedDates(passMe);
					}
				};

				$rootScope.$on('get-feed', function () {
					getTodaysFeed();
				});

				// analysis page disabled
				// $scope.analyzeData = function () {
				// 	$location.path('analysis');
				// };

				$scope.getSelectedDate = function () {
					DashboardFactory.selectedDates($scope.date);
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
							$rootScope.stories = $scope.stories;
							// AnalysisFactory.sendStories($scope.stories);
							$rootScope.pages = newData.links;
							// keeping track of the time since:
							if($scope.stories[$scope.stories.length - 1].pub_date) {
								DashboardFactory.sendTimeSince($scope.stories[$scope.stories.length - 1].pub_date);
						};
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
						// auto loads first # of pages
						// setting aLcount range at 300 yields ~ 5000 results
						// in one test, 300 provided results from 4:35PM back to 12AM
						// retrieving results at 300 took about 10 mins
						// setting aLcount higher will take longer/slow down the app
						if(aLcount < 50) {
							autoLoad(data);
						} else {
							aLcount = 2;
							console.log($rootScope.stories);
						}
					});
				}; // end autoLoad

			} // end function block

		]);

}()); // end iife