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
		]); // end factory
}()); // end iife