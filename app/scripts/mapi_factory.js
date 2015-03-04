(function () {

	'use strict';

	angular.module('complianceApp')
		.factory('MapiFactory', ['$http', '$window', '$resource', '$q',
			function ($http, $window, $resource, $q) {

				var url = 'https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/?q=';

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
					$.getJSON(url + '"' + name + '"' +'&f=categories:"/News"', function (data) {
						deferred.resolve(data);
					});

					return deferred.promise;

				};

				// To search for inputted text
				var getTextData = function (query) {
					var deferred = $q.defer();
					var filter = 'f=categories:"/News"';
					$.getJSON(url + '"' + query + '"' + '&page=2', function (data) {
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
