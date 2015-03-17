(function () {

	'use strict';

	angular.module('complianceApp')
		.factory('MapiFactory', ['$http', '$window', '$resource', '$q',
			function ($http, $window, $resource, $q) {

				// using Nodejitsu's jsonp.js library
				// to get around CORS and callback wrapping issue
				// var url = 'https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/';
				// local json proxy
				var url = 'http://localhost:8000/?url=http://search.cmgdigital.com/v2/';
				var sortByRecent = encodeURIComponent('&sort_by=content_modified');
				// need to prepend +AND+ if appending to filter
				// prepend &f= if appending to another query or search
				var noImages = encodeURIComponent('-item_class:"https://cv.cmgdigital.com/item_class/picture/photos.medleyphoto/"');

				// GUIDs for Reference: https://docs.google.com/spreadsheets/d/1nQGfsblYTK0QfLErthkMjgirIEmYtsLGCe4dlDruQT8/edit?pli=1#gid=0

				// In case you need a random string of numbers
				var randomString = function (length, chars) {
					var result = '';
					for (var i = length; i > 0; --i) {
						result += chars[Math.round(Math.random() * (chars.length - 1))];
					}
					return result;
				};

				// To pull data from API for Authors List
				var getData = function (name) {
					var deferred = $q.defer();
					// Replace any duplicate whitespaces with single white space
					var cleanName = name.replace(/\s+/g, ' ');
					var query = encodeURIComponent('?s=by:"' + cleanName + '"');
					$.getJSON(url + query + sortByRecent + '&f=' + noImages, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				// To pull data from API for Topics List
				var getTopicData = function (topic) {
					var deferred = $q.defer();
					var query = encodeURIComponent('?f=topics:"' + topic + '"');
					$.getJSON(url + query + '+AND+' + noImages, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				// To search for inputted text
				var getTextData = function (query) {
					var deferred = $q.defer();
					$.getJSON(url + '?q=' + '"' + query + '"' + sortByRecent +'&f=' + noImages, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				// Cycle Pagination
				var getNextPage = function (url) {
					var deferred = $q.defer();
					// var moddedUrl = 'https://jsonp.nodejitsu.com/?callback=?&url=' + encodeURIComponent(url);
					// local json proxy
					var moddedUrl = 'http://localhost:8000/?url=' + encodeURIComponent(url);
					$.getJSON(moddedUrl, function (data) {
						deferred.resolve(data);
					});
					return deferred.promise;
				};

				return {
					getData				: getData,
					getTextData		: getTextData,
					getNextPage		: getNextPage,
					getTopicData	: getTopicData
	      };

			} // end function block

		]); // end factory

}()); // end iife
