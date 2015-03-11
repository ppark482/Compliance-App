(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory',

			function ($scope, $location, DashboardFactory) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				$scope.today = DashboardFactory.getTheDate();

				DashboardFactory.getDailyData().then( function (data) {
					console.log(data);
					$scope.stories = data.entities;
				});



			} // end function block

		]);

}()); // end iife