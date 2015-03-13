(function(){ 
	angular.module('complianceApp')
		.controller('ProviderModalCtrl', ['$scope', 'DashboardCtrl', 'DashboardFactory', 'MapiFactory',

			function ($scope, DashboardCtrl, DashboardFactory, MapiFactory) {
				console.log('ProviderModalCtrl on');
			}	// end function block

		]);

}()); // end iife