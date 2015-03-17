(function(){ 
	angular.module('complianceApp')
		.factory('ProviderDetailedFactory', ['$http', 
			function ($http) {

				var detailedItems;

				// get provider items from ModalInstanceCtrl
				var fullDetails = function (items) {
					detailedItems = items;
				};

				// allow access to these items to other controllers/services
				var getDetailedItems = function () {
					return detailedItems;
				};

				return {
					fullDetails : fullDetails,
					getDetailedItems : getDetailedItems
				}

			} // end function block
		]) // end factory

		.directive('detailedProvider',

			function () {

				return {
					restrict: 'E',
					require: '^ngModel',
					controller: 'ProviderDetailedCtrl',
					templateUrl: 'views/provider_detailed_template.html'
				}
			} // end function block

		); // end directive
}()); // end iife