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
				DashboardFactory.getAJCstories().then( function (data) {
					// data is filtered before being passed to DashboardCtrl
					$scope.stories = data.entities;
					$scope.pages = data.links;
					$scope.resultsCount = $scope.stories.length;
					modifyCounts($scope.stories);
					autoLoad(data);
				});

				// Updates scope with more results on click of load more
				$scope.loadMore = function (url) {
					$scope.busy = MapiFactory.getNextPage(url).then( function (data) {
						console.log(data);
						var newData = DashboardFactory.filterResults(data);
						angular.forEach(newData.entities, function (x) {
							$scope.stories.push(x);
						});
						$scope.stories = _.unique($scope.stories);
						$scope.pages = newData.links;
						console.log($scope.pages);
						$scope.resultsCount = $scope.stories.length;
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
						$scope.resultsCount = $scope.stories.length;
						modifyCounts($scope.stories);
						// starts loop
						aLcount++;
						// auto loads first # of pages
						// setting aLcount range at 20 yields ~ 220 results
						// setting aLcount higher will slow down or crash browser
						if(aLcount < 100) {
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