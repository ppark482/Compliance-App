(function () {

	'use strict';

	angular.module('decaturApp')
		.factory('YelpApi', ['$http', '$window',
			function ($http, $window) {

				var randomString = function (length, chars) {
					var result = '';
					for (var i = length; i > 0; --i) {
						result += chars[Math.round(Math.random() * (chars.length - 1))];
					}
					return result;
				};

				var retrieveYelp = function (name, callback) {
					var method = 	'GET';
					var url = 		'http://api.yelp.com/v2/search';
					var params = {
						callback: 								'angular.callbacks._0',
						location: 								'30030',
						oauth_consumer_key: 			'9AQIMYpjhQ4hJOBWOYkd1Q', // consumer key
						oauth_token: 							'oIFtcn9XsRAcX0hPQsHh35Q33B-xH8nA', //Token
						oauth_signature_method: 	'HMAC-SHA1',
	          oauth_timestamp: 					new Date().getTime(),
	          oauth_nonce: 							randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	          term: 										'food'
					}; // end params
					var consumerSecret = 				'm1cfO6QnaQtaUgmmu86FpPJfCrQ'; //Consumer Secret
					var tokenSecret = 					'5thyRrKUI7Zjj8u7qLN2rq-lWqM'; //Token Secret
		      var signature = 
		      	oauthSignature.generate(
			      	method, 
			      	url, 
			      	params, 
			      	consumerSecret, 
			      	tokenSecret, 
			      	{ encodeSignature: false }
		      	); 
		      	// end signature
		      params['oauth_signature'] = signature;
		      $http.jsonp(url, { params : params })
		      	.success(callback);
				}; // end retrieveYelp

				return {
	    		retrieveYelp: retrieveYelp      
	      };

			} // end function block

		]); // end factory

}()); // end iife
