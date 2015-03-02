(function(){

	'use strict';

	angular.module('decaturApp')
		.factory('AjcFeed', ['$http', '$window', '$q',
			function ($http, $window, $q) {

		  	// var feed = new google.feeds.Feed('http://www.accessatlanta.com/list/rss-mobile/entertainment/restaurants/featured-atlanta-restaurants/aMT5/');

		  	var feed = new google.feeds.Feed('http://www.ajc.com/flist/entertainment/restaurants/restaurant-review/fmn/rss/');

		  	feed.setNumEntries(5);

				feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
				// feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

				var loadFeed = function () {
					var deferred = $q.defer();
					feed.load( function (result) {
						deferred.resolve(result);
					});

					return deferred.promise;
				};

				return {
					loadFeed 	: loadFeed
				};

			} // end function block

		]); // end factory

}()); // end iife