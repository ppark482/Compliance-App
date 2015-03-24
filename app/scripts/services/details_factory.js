(function () { 

/*//////////////////////////////////////////////////////////////////////////////
// 
// Service for full details page
// 	passes data from dashboard / nav bars to full details page
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')
		.factory('DetailsFactory', ['$http', '$rootScope',
			function ($http, $rootScope) {

				var detailedItems;

				// get provider items from ModalInstanceCtrl
				var fullDetails = function (items) {
					detailedItems = '';
					detailedItems = items;
				};

				// allow access to these items to other controllers/services
				var getDetailedItems = function () {
					console.log(detailedItems);
					return detailedItems;
				};

				return {
					fullDetails : fullDetails,
					getDetailedItems : getDetailedItems
				}

			} // end function block
		]); // end factory
}()); // end iife