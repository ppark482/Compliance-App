(function(){ 
	angular.module('complianceApp')
		.controller('DetailsCtrl', ['$scope', '$rootScope', 'ProviderModalFactory',

			function ($scope, $rootScope, ProviderModalFactory) {

				$rootScope.$on('full-details', function () {
					$scope.detailedItem = ProviderModalFactory.getDetailedItems();
					console.log($scope.detailedItem);
				});

			} //end function block

		]); // end factory
}()); // end iife