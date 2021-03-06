;(function () {

	'use strict';

/*//////////////////////////////////////////////////////////////////////////////
// 
// Controller for search page
// Directives for scrollOnClick & stopEvent
// 
//////////////////////////////////////////////////////////////////////////////*/

	angular.module('complianceApp')
	  .controller('MainCtrl', ['$scope', '$window', '$rootScope', '$http', 'MapiFactory', '$filter', '$location', '$anchorScroll',
	  	function ($scope, $window, $rootScope, $http, MapiFactory, $filter, $location, $anchorScroll) {

	  		$scope.goToDashboard = function () {
	  			$location.path('/');
	  		};

	  		$scope.linkItems = [	  			
	  			'Helena Oliviero',
					'John Kessler',
					'Shelia Poole',
					'Howard Pousner',
					'Bob Townsend',
					'Jill Vejnoska',
					'Gracie Bonds Staples',
					'Nedra Rhone',
					'Bo Emerson',
					'Mark Davis',
					'Lori Johnston',
					'H.M. Cauley',
					'Michelle C. Brooks'
				];

				$scope.topicList = [
					'ajc-features',
					'restaurants',
					'ajc-hottopics',
					'ajc-atlantanow',
					'ajc-education',
					'AJC sports',
					'ajc-audience',
					'ajc-localgovt',
					'ajc-fedstategovt',
					'ajc-print',
					'ajc-economics',
					'ajc-investigative1',
					'ajc-investigative2',
					'ajc-visuals',
					'ajc-data',
					'buford',
					'decatur',
					'roswell',
					'smyrna',
					'marietta',
					'peachtree city',
					'buckhead',
					'intown atlanta',
					'sandy springs'
				];

				var scopeEm = function (data) {
						$scope.authorData = {};
						$scope.pages = {};
						$scope.authorData = data.entities;
	  				$scope.pages = data.links;
	  			};

	  		// Gets Data For Selected Author
				$scope.selectedQuery = function (name) {
					MapiFactory.getData(name).then( function (data) {
						console.log(data);
						scopeEm(data);
						$scope.searchAuthorName = {} && '';
						$scope.searchAuthorForm.$setPristine();
					})
				};

				// Gets Data For Selected Topic
				$scope.selectedTopic = function (topic) {
					MapiFactory.getTopicData(topic).then( function (data) {
						console.log(data);
						scopeEm(data);
					})
				};

				// Gets Data For Inputted Text
				$scope.searchByQuery = function (query) {
					console.log(query);
					MapiFactory.getTextData(query).then( function (data) {
						console.log(data);
						scopeEm(data);
	  				$scope.queryString = {} && '';
	  				$scope.searchForm.$setPristine();
					})
				};

				// Gets Next or Previous Page
				$scope.nextPage = function (url) {
					console.log(url);
					MapiFactory.getNextPage(url).then( function (data) {
						console.log(data);
						scopeEm(data);
					})
				};

				// Controls the Modified By Order
				var orderBy = $filter('orderBy');

				$scope.order = function (predicate, reverse) {
					$scope.authorData = orderBy($scope.authorData, predicate, reverse);
				};

				$scope.order('-content_modified', false);

				// Back to Top Button
				$scope.backToTop = function () {
					// Setting DOM element to go to
					$location.hash('top');
					$anchorScroll();
				};

	  	} // end function block

	  ]) // end controller

	  .directive('stopEvent', function () {

	  	return {
	  		restrict: 'A',
	  		link: function (scope, element, attr) {
	  			element.bind('click', function (e) {
	  				e.stopPropagation();
	  			});
	  		}
	  	};

	  }) // end directive
	  .directive('scrollOnClick', function() {
		  return {
		    restrict: 'A',
		    link: function(scope, $elm) {
		      $elm.on('click', function() {
		        $("body").animate({scrollTop: $elm.offset().top}, "slow");
		      });
		    }
		  }
		}); // end directive

}()); // end iife