;(function () { 

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
					return detailedItems;
				};

				// counts by topic
				var getDetailedCounts = function () {
					var counter = {
						featured 			: 0,
						localMonitor 	: 0,
						weirdNews			: 0
					};
					_.each(detailedItems, function (x) {
						if(_.contains(x.topics, 'pt-featured')) {
							counter.featured++;
							return;
						} else if (_.contains(x.topics, 'pt-local-monitor')) {
							counter.localMonitor++;
							return;
						} else if (_.contains(x.topics, 'pt-weird-news')) {
							counter.localMonitor++;
							return;
						}
					});
					return counter;
				};

				return {
					fullDetails : fullDetails,
					getDetailedItems : getDetailedItems,
					getDetailedCounts : getDetailedCounts
				}

			} // end function block
		]); // end factory
}()); // end iife