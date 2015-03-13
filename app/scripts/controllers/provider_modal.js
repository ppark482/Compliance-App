(function(){

	angular.module('complianceApp')

		.controller('ProviderModalCtrl', ['$scope', '$modal', 'DashboardFactory', 'MapiFactory', 'ProviderModalFactory',

			function ($scope, $modal, DashboardFactory, MapiFactory, ProviderModalFactory) {

				$scope.openModal = function (provider) {
					
					var modalInstance = $modal.open({
						templateUrl: 'views/provider_modal_template.html',
						controller: 'ModalInstanceCtrl',
						resolve: {
							items: function () {
								return provider;
							}
						}
					}); // end modalInstance

					// Pass Provider Data to Factory as Modal is Instantiated
					ProviderModalFactory.passProviders(provider);
				
				}; // end openModal

			}	// end function block

		]) // end controller

		.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', 'ProviderModalFactory',
			
			function ($scope, $modalInstance, items, ProviderModalFactory) {

				$scope.providers = items;

				$scope.authors = ProviderModalFactory.getAuthors();

				$scope.ok = function () {
					$modalInstance.close($scope.selected.item);
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};

			} // end function block

		]) // end controller

/*
=================================== Business Logic for Provider Modals Go Here :
*/

		.factory('ProviderModalFactory', ['$http', '$window',

			function ($http, $window) {

				var authors;

				var passProviders = function (providers) {
					authorCount(providers);
				};

				var authorCount = function (array) {
					// Pull author names and how many of each author there are
					authors = _.groupBy(array, function (x) {
						if (!x.by) {
							return 'No Author';
						} else {
							return x.by[0].name;	
						}
					});
				};

				var getAuthors = function (x) {
					return authors;
				};

				return {
					passProviders 	: passProviders,
					getAuthors 			: getAuthors
				}

			} // end function block

		]); // end modal factory

}()); // end iife