(function(){ 
	angular.module('complianceApp')
		.controller('DetailsCtrl', ['$scope', '$rootScope', 'DetailsFactory', '$location',

			function ($scope, $rootScope, DetailsFactory, $location) {

				$scope.newSearch = function () {
					$rootScope.$broadcast('reload-feed');
					$location.path('/');
				};

				$scope.detailedItems = DetailsFactory.getDetailedItems();

			} //end function block

		]); // end factory
}()); // end iife