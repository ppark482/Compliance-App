(function(){ 

	angular.module('complianceApp')

		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory', '$rootScope',

			function ($scope, $location, DashboardFactory, MapiFactory, $rootScope) {

				var autoLoad;

				$rootScope.$on('get-feed', function () {
					getTodaysFeed();
				});

				// Gets initial round of data
				var getTodaysFeed = function () {
					DashboardFactory.getAJCstories().then( function (data) {
						// data is filtered before being passed to DashboardCtrl
						$scope.stories = data.entities;
						$scope.pages = data.links;
						DashboardFactory.sendCount($scope.stories.length);
						// modifyCounts($scope.stories);
						autoLoad(data);
					});
				};

				// Updates scope with more results on click of load more
				$scope.loadMore = function (url) {
					$scope.busy = MapiFactory.getNextPage(url).then( function (data) {
						var newData = DashboardFactory.filterResults(data);
						angular.forEach(newData.entities, function (x) {
							$scope.stories.push(x);
						});
						$scope.stories = _.unique($scope.stories); // removes duplicate links
						$scope.pages = newData.links;

						// keeping track of the time since:
						if($scope.stories[$scope.stories.length - 1].content_modified) {
							DashboardFactory.sendTimeSince = $scope.stories[$scope.stories.length - 1].content_modified;
						};
						// keeping track of the results count
						DashboardFactory.sendCount($scope.stories.length);
						// keeping track of the number of stories
						// stories for each provider category
						DashboardFactory.modifyCounts($scope.stories);
						$rootScope.$broadcast('feed-loaded');
					});
				};

				// Counts for autoLoad
				var aLcount = 2;
				
				// Auto Load next set of data until end of date range
				var autoLoad = function (data) {
					$scope.busy = MapiFactory.getNextPage(data.links[1].href).then( function (data) {
						var newData = DashboardFactory.filterResults(data);
						angular.forEach(newData.entities, function (x) {
							$scope.stories.push(x);
						});
						$scope.stories = _.unique($scope.stories); // removes duplicate links
						$scope.pages = newData.links;

						// keeping track of the time since:
						if($scope.stories[$scope.stories.length - 1].content_modified) {
							DashboardFactory.sendTimeSince = $scope.stories[$scope.stories.length - 1].content_modified;
						};
						// keeping track of the results count
						DashboardFactory.sendCount($scope.stories.length);
						// keeping track of the number of stories
						// stories for each provider category
						DashboardFactory.modifyCounts($scope.stories);
						$rootScope.$broadcast('feed-loaded');
						// starts loop
						aLcount++;
						// auto loads first # of pages
						// setting aLcount range at 300 yields ~ 5000 results
						// in one test, 300 provided results from 4:35PM back to 12AM
						// retrieving results at 300 took about 10 mins
						// setting aLcount higher will take longer/slow down the app
						if(aLcount < 100) {
							autoLoad(data);
						}
					});
				};

				// Modifies counts on left bar
				// var modifyCounts = function (data) {
				// 	var providerCounts = DashboardFactory.modifyCounts(data);
				// 	$scope.ajcStories 			= providerCounts.ajc_stories;
				// 	$scope.photo_galleries 	= providerCounts.photo_galleries;
				// 	$scope.wp_vip 					= providerCounts.wp_vip;
				// 	$scope.publish_this 		= providerCounts.publish_this;
				// 	$scope.ap_stories 			= providerCounts.ap_stories;
				// };

			} // end function block

		]);

}()); // end iife