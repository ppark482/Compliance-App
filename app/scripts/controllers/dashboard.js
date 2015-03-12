(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory', 'MapiFactory',

			function ($scope, $location, DashboardFactory, MapiFactory) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				$scope.today = DashboardFactory.getTheDate();
				console.log($scope.today);

				// DashboardFactory.getDailyData().then( function (data) {
				// 	console.log(data);
				// 	$scope.stories = data.entities;
				// });

				DashboardFactory.getAJCstories().then( function (data) {
					console.log(data);
					$scope.stories = data.entities;
					$scope.pages = data.links;
				});

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