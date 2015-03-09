(function () {

	'use strict';

	angular.module('complianceApp')
		.factory('MapiFactory', ['$http', '$window', '$resource', '$q',
			function ($http, $window, $resource, $q) {

				var url = 'https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/';

				// GUIDs for Reference: https://docs.google.com/spreadsheets/d/1nQGfsblYTK0QfLErthkMjgirIEmYtsLGCe4dlDruQT8/edit?pli=1#gid=0

				// In case you need a random string of numbers
				var randomString = function (length, chars) {
					var result = '';
					for (var i = length; i > 0; --i) {
						result += chars[Math.round(Math.random() * (chars.length - 1))];
					}
					return result;
				};

				// To pull data from API
				var getData = function (name) {
					var deferred = $q.defer();
					// using Nodejitsu's jsonp.js library
					// to get around CORS and callback wrapping issue
					var query = encodeURIComponent('?s=by:"' + name + '"');
					var timeRange = encodeURIComponent('&f=content_modified:[NOW-1MONTH TO NOW]');
					// var storyLimit = encodeURIComponent('&f=item_class:"https://cv.cmgdigital.com/item_class/composite/news.medleystory/"');
					$.getJSON(url + query + timeRange, function (data) {
						deferred.resolve(data);
					});

					return deferred.promise;

				};

				// To search for inputted text
				var getTextData = function (query) {
					var deferred = $q.defer();
					// var filter = encodeURIComponent('&s=categories:"/News"');
					// var filter2 = encodeURIComponent('+AND+topics:"food"');
					// var filterRecent = encodeURIComponent('&s=content_modified:[2015-02-01]');
					var moreResults = encodeURIComponent('&count=100');
					$.getJSON(url + '"' + query + '"' + moreResults, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				// To get 10 pages of puppies
				var getPuppies = function () {
					var deferred = $q.defer();
					$.getJSON('https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/?q="puppies"&page=10&format=json', function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				}

				return {
					getData: getData,
					getTextData: getTextData,
					getPuppies: getPuppies
	      };

			} // end function block

		]); // end factory

}()); // end iife
