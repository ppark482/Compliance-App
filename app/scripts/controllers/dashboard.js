(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory',

			function ($scope, $location, DashboardFactory, MapiFactory) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				// Displays what the date is
				$scope.today = DashboardFactory.getTheDate();

				// Gets initial round of results
				DashboardFactory.getAJCstories().then( function (data) {
					console.log(data);
					$scope.stories = data.entities;
					$scope.pages = data.links;
					$scope.resultsCount = $scope.stories.length;
					modifyCounts($scope.stories);
				});

				// Updates scope with more results on click of load more
				$scope.loadMore = function (url) {
					MapiFactory.getNextPage(url).then( function (data) {
						angular.forEach(data.entities, function (x) {
							$scope.stories.push(x);
						});
					$scope.pages = data.links;
					$scope.resultsCount = $scope.stories.length;
					modifyCounts($scope.stories);
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

				$scope.openModal = function (provider) {
					console.log(provider);
				};

			} // end function block

		]);

}()); // end iife