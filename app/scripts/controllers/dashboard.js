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
				});

				// Updates scope with more results on click of load more
				$scope.loadMore = function (url) {
					MapiFactory.getNextPage(url).then( function (data) {
						angular.forEach(data.entities, function (x) {
							$scope.stories.push(x);
						});
						$scope.pages = data.links;
					});
				};

			} // end function block

		]);

}()); // end iife