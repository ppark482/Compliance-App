(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location', 'DashboardFactory',

			function ($scope, $location, DashboardFactory) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

				DashboardFactory.getDailyData().then( function (data) {
					console.log(data);
				});



			} // end function block

		]);

}()); // end iife