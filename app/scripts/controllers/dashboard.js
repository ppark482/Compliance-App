(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory',

			function ($scope, $location, DashboardFactory, MapiFactory) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				// Displays what the date is
				$scope.today = DashboardFactory.getTheDate();

				var scopeEm = function (data) {
					$scope.pages = data.links;
					$scope.resultsCount = $scope.stories.length;
				}

				// Gets initial round of results
				DashboardFactory.getAJCstories().then( function (data) {
					console.log(data);
					$scope.stories = data.entities;
					scopeEm(data);
				});

				// Updates scope with more results on click of load more
				$scope.loadMore = function (url) {
					MapiFactory.getNextPage(url).then( function (data) {
						angular.forEach(data.entities, function (x) {
							$scope.stories.push(x);
						});
						scopeEm(data);
					});
				};

			} // end function block

		]);

}()); // end iife