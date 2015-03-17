(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory',

			function ($scope, $location, DashboardFactory, MapiFactory) {

				var autoLoad;

				$scope.goToSearch = function () {
					$location.path('search');
				};

				// Displays what the date is
				$scope.today = DashboardFactory.getTheDate();

				// Gets initial round of data
				$scope.getTodaysFeed = function () {
					DashboardFactory.getAJCstories().then( function (data) {
						// data is filtered before being passed to DashboardCtrl
						$scope.stories = data.entities;
						$scope.pages = data.links;
						$scope.resultsCount = $scope.stories.length;
						modifyCounts($scope.stories);
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
							$scope.timeSince = $scope.stories[$scope.stories.length - 1].content_modified;
						};
						console.log($scope.stories.length);
						// keeping track of the results count
						$scope.resultsCount = $scope.stories.length;
						// keeping track of the number of stories
						// stories for each provider category
						modifyCounts($scope.stories);
						console.log($scope.stories);
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
							$scope.timeSince = $scope.stories[$scope.stories.length - 1].content_modified;
						};
						// keeping track of the results count
						$scope.resultsCount = $scope.stories.length;
						// keeping track of the number of stories
						// stories for each provider category
						modifyCounts($scope.stories);
						// starts loop
						aLcount++;
						// auto loads first # of pages
						// setting aLcount range at 300 yields ~ 5000 results
						// in one test, 300 provided results from 4:35PM back to 12AM
						// retrieving results at 300 took about 10 mins
						// setting aLcount higher will take longer/slow down the app
						if(aLcount < 10) {
							autoLoad(data);
						}
					});
				};

				// Modifies counts on left bar
				var modifyCounts = function (data) {
					var providerCounts = DashboardFactory.modifyCounts(data);
					$scope.ajcStories 			= providerCounts.ajc_stories;
					$scope.photo_galleries 	= providerCounts.photo_galleries;
					$scope.wp_vip 					= providerCounts.wp_vip;
					$scope.publish_this 		= providerCounts.publish_this;
					$scope.ap_stories 			= providerCounts.ap_stories;
				};

			} // end function block

		]);

}()); // end iife