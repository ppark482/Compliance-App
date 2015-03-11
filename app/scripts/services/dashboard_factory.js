(function () { 

	angular.module('complianceApp')
		.factory('DashboardFactory', ['$http', '$window', '$resource', '$q',

			function ($http, $window, $resource, $q) {

				// using Nodejitsu's jsonp.js library
				// to get around CORS and callback wrapping issue
				var url = 'https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/';
				var sortByRecent = encodeURIComponent('&sort_by=content_modified');
				// need to prepend +AND+ if appending to filter
				// prepend &f= if appending to another query or search
				var noImages = encodeURIComponent('-item_class:"https://cv.cmgdigital.com/item_class/picture/photos.medleyphoto/"');

				var getDates = function () {
					// get today's date
					var getToday = function () {
						return new Date();
					};
					// convert today's date to UTC
					var today = getToday().toISOString();
					// subtract a day from today
					var yesterday = new Date(today);
					yesterday.setDate(yesterday.getDate()-1);
					// convert yesterday to UTC
					yesterday = yesterday.toISOString();
					return encodeURIComponent('?s=content_modified:[' + yesterday + ' TO ' + today + ']');
				}; // end getDates

				// get daily values
				var getDailyData = function () {
					var deferred = $q.defer();
					var dateRange = getDates();
					// var count = encodeURIComponent('&count=300');
					var ajcStories = encodeURIComponent('&f=provider:"Publish This"');
					$.getJSON(url + dateRange + sortByRecent + ajcStories, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				}; // end getDailyDate

				return {
					getDailyData : getDailyData
				};

			} // end function block

		]); // end factory

}()); // end iife