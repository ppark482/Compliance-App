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

				// Get the day of the week
				var getTheDate = function () {
					var today = new Date();
					var year = today.getFullYear();
					var date = today.getDate()
					var month = today.getMonth() + 1; // getMonth() returns an integer between 0 & 11
					var day = today.getDay();
					var fullDate = ', ' + month + '/' + date + '/' + year;
					switch (day) {
						case 0:
							return 'Sunday' + fullDate;
							break;
						case 1:
							return 'Monday' + fullDate;
							break;
						case 2:
							return 'Tuesday' + fullDate;
							break;
						case 3:
							return 'Wednesday' + fullDate;
							break;
						case 4:
							return 'Thursday' + fullDate;
							break;
						case 5:
							return 'Friday' + fullDate;
							break;
						default:
							return 'Saturday' + fullDate;
					}
				};

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
					// var count = encodeURIComponent('&count=300');
					var dateRange = getDates();
					var ajcStories = encodeURIComponent('&f=provider:"Publish This"');
					$.getJSON(url + dateRange + sortByRecent, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				}; // end getDailyDate

				// get AJC Stories
				var getAJCstories = function () {
					var deferred = $q.defer();
					var dateRange = getDates();
					var query = encodeURIComponent('?q="WordPress VIP"');
					$.getJSON(url + query + dateRange + sortByRecent, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				// modify count displays
				var modifyCounts = function (data) {
					var providerCounts = {
						ajc_stories 		: [],
						photo_galleries : [],
						wp_vip 					: [],
						publish_this 		: [],
						ap_stories 			: []
					};
					angular.forEach(data, function (x) {
						if (x.provider.name === "WordPress VIP") {
							providerCounts.wp_vip.push(x);
						} else if (x.provider.name === "PublishThis") {
							providerCounts.publish_this.push(x);
						} else if (x.provider.name === "www.ajc.com") {
							providerCounts.ajc_stories.push(x);
						} else if (x.provider.name === "The Associated Press") {
							providerCounts.ap_stories.push(x);
						} 
					});
					return providerCounts;
				};

				return {
					getTheDate		: getTheDate,
					getDailyData 	: getDailyData,
					getAJCstories	: getAJCstories,
					modifyCounts 	: modifyCounts
				};

			} // end function block

		]); // end factory

}()); // end iife