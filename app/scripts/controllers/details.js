(function(){ 
	angular.module('complianceApp')
		.controller('DetailsCtrl', ['$scope', '$rootScope', 'DetailsFactory', '$location',

			function ($scope, $rootScope, DetailsFactory, $location) {

				$scope.backHome = function () {
					$rootScope.$broadcast('reload-feed');
					$location.path('/');
				};

				$scope.detailedItems = DetailsFactory.getDetailedItems();

				console.log($scope.detailedItems);

			} //end function block

		]); // end factory
}()); // end iife