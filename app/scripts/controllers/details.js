;(function () {

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for full details page
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')
		.controller('DetailsCtrl', ['$scope', '$rootScope', 'DetailsFactory', '$location',

			function ($scope, $rootScope, DetailsFactory, $location) {

				$scope.backHome = function () {
					// $rootScope.$broadcast('reload-feed');
					$rootScope.$broadcast('feed-loaded');
					$location.path('/');
				};

				$scope.detailedItems = DetailsFactory.getDetailedItems();

				$scope.topicCounts = DetailsFactory.getDetailedCounts();
				console.log($scope.topicCounts);
				console.log($scope.detailedItems);

			} //end function block

		]); // end factory
}()); // end iife