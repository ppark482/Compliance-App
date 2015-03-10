(function(){ 

	angular.module('complianceApp')
		.controller('DashboardCtrl', ['$scope', '$location',

			function ($scope, $location) {

				$scope.goToSearch = function () {
					$location.path('search');
				};

			} // end function block

		]);

}()); // end iife