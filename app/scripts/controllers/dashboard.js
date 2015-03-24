(function(){ 

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for dashboard
		- handles loading / auto loading of feed 
		- date picker
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')

		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory', '$rootScope', '$route',

			function ($scope, $location, DashboardFactory, MapiFactory, $rootScope, $route) {

				var autoLoad;
				$scope.searchResults = '';

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
				
				// Auto Load next set of data until end of date range
				var autoLoad = function (data) {
					$scope.busy = MapiFactory.getNextPage(data.links[1].href).then( function (data) {
						var newData = DashboardFactory.filterResults(data);
						angular.forEach(newData.entities, function (x) {
							$scope.stories.push(x);
						});
						$scope.stories = _.unique($scope.stories); 
						// removes duplicate links
						$rootScope.stories = $scope.stories;
						$rootScope.pages = newData.links;
						// keeping track of the time since:
						if($scope.stories[$scope.stories.length - 1].content_modified) {
							DashboardFactory.sendTimeSince($scope.stories[$scope.stories.length - 1].content_modified);
						};
						// keeping track of the results count
						DashboardFactory.sendCount($rootScope.stories.length);
						// keeping track of the number of stories
						// stories for each provider category
						DashboardFactory.modifyCounts($rootScope.stories);
						// console.log($scope.stories);
						$rootScope.$broadcast('feed-loaded');
						// starts loop
						aLcount++;
						// auto loads first # of pages
						// setting aLcount range at 300 yields ~ 5000 results
						// in one test, 300 provided results from 4:35PM back to 12AM
						// retrieving results at 300 took about 10 mins
						// setting aLcount higher will take longer/slow down the app
						if(aLcount < 250) {
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