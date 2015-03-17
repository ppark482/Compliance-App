(function(){ 
	angular.module('complianceApp')
		.controller('ProviderDetailedCtrl', ['$scope', 'ProviderDetailedFactory',

			function ($scope, ProviderDetailedFactory) {

				$scope.detailedItem = ProviderDetailedFactory.getDetailedItems();

			} //end function block

		]); // end factory
}()); // end iife