(function () {
	'use strict'

/*//////////////////////////////////////////////////////////////////////////////
// 
// Service for analysis page
// 
//////////////////////////////////////////////////////////////////////////////*/
	
	angular.module('complianceApp')

		.factory('AnalysisFactory', ['$rootScope',

			function ($rootScope) {

				var currentStories;

				var sendStories = function (stories) {
					currentStories = stories;
				};

				var getStories = function () {
					return currentStories;
				};

				return {
					sendStories : sendStories,
					getStories : getStories
				}

			} // end function  block

		]); // end factory

}()); // end iife