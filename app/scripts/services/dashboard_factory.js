(function () { 

	angular.module('complianceApp')
		.factory('DashboardFactory', ['$http', '$window', '$resource', '$q',

			function ($http, $window, $resource, $q) {

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
					// get beginning of today
					var start = new Date(today);
					start.setHours(0,0,0,0);
					console.log(start);
					// convert yesterday to UTC
					start = start.toISOString();
					return encodeURIComponent('?s=content_modified:[' + start + ' TO ' + today + ']');
				}; // end getDates

								// using Nodejitsu's jsonp.js library
								// to get around CORS and callback wrapping issue

				// nodejitsu json proxy
				// var url = 'https://jsonp.nodejitsu.com/?callback=?&url=http://search.cmgdigital.com/v2/';
				// local json proxy
				var url = 'http://localhost:8000/?url=http://search.cmgdigital.com/v2/';
				var sortByRecent = encodeURIComponent('&sort_by=content_modified');
							// need to prepend +AND+ if appending to filter
							// prepend &f= if appending to another query or search
							// attempts to filter out images and videos
							// some queries here seem to get dropped or ignored
				// var noImages = encodeURIComponent('&f=(-item_class:"https://cv.cmgdigital.com/item_class/picture/photos.medleyphoto/"+AND+-details_django_ct:"photos.medleyphoto"+AND+-details_django_ct:"list_o_rama.externalfeed"+AND+-item_class:"https://cv.cmgdigital.com/item_class/composite/videos.vendorvideoplaylist/")');

				// gets AJC Stories from www.ajc.com OR PublishThis
				// OR WordPress VIP OR The Atlanta Journal-Constitution
				var getAJCstories = function () {
					var deferred = $q.defer();
					var dateRange = getDates();
					// f=item_class:"https://cv.cmgdigital.com/item_class/composite/news.medleystory/"
					var query = encodeURIComponent('&f=provider_name:"www.ajc.com"+OR+provider_name:"The Associated Press"+OR+provider_name:"WordPress VIP"+OR+provider_name:"The Atlanta Journal-Constitution"+OR+item_class:"photo.medleygallery"');
					$.getJSON(url + dateRange + query + sortByRecent, function (data) {
						console.log(data);
						var filteredData = filterResults(data);
						deferred.resolve(filteredData);
					});
					return deferred.promise;
				};
////////////////////////////////////////////////////////////////////////////////
				// Further filter results
				// Query seems to drop parameters if there are too many parameters
				// Add all new filters to this function block
				// Don't forget to change dataObj.entities
////////////////////////////////////////////////////////////////////////////////
				var filterResults = function (data) {
					var noPics = _.reject(data.entities, function (x) {
						return x.item_class === "https://cv.cmgdigital.com/item_class/picture/photos.medleyphoto/";
					});
					var noVids = _.reject(noPics, function (x) {
						return x.item_class === "https://cv.cmgdigital.com/item_class/composite/videos.vendorvideo/";
					});
					var noVidLists = _.reject(noVids, function (x) {
						return x.item_class === "https://cv.cmgdigital.com/item_class/composite/videos.vendorvideoplaylist/";
					});
					var noStaff = _.reject(noVidLists, function (x) {
						return x.details.django_ct === "staff.medleystaffmember";
					});
					var noListORama = _.reject(noStaff, function (x) {
						return x.item_class === "https://cv.cmgdigital.com/item_class/composite/list_o_rama.externalfeed/";
					});
					var noAutoLists = _.reject(noListORama, function (x) {
						return x.item_class === "https://cv.cmgdigital.com/item_class/composite/medley_lists.fastautolist/";
					});
					var dataObj = {
						// change me for new filter
						entities : noAutoLists,
						links : data.links,
					};
					return dataObj;
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
					var isPhotoGallery = function (x) {
						if (x.item_class === "https://cv.cmgdigital.com/item_class/composite/photos.medleygallery/") {
							providerCounts.photo_galleries.push(x);
						}
					};
					angular.forEach(data, function (x) {
						if (x.provider.name === 'WordPress VIP') {
							isPhotoGallery(x);
							providerCounts.wp_vip.push(x);
						} else if (x.provider.name === 'PublishThis') {
							isPhotoGallery(x);
							providerCounts.publish_this.push(x);
						} else if (x.provider.name === 'www.ajc.com') {
							isPhotoGallery(x);
							providerCounts.ajc_stories.push(x);
						}	else if (x.provider.name === 'The Atlanta Journal-Constitution') {
							isPhotoGallery(x);
							providerCounts.ajc_stories.push(x);
						}	else if (x.provider.name === 'The Associated Press') {
							isPhotoGallery(x);
							providerCounts.ap_stories.push(x);
						}
					});
					return providerCounts;
				};

				return {
					getTheDate		: getTheDate,
					getAJCstories	: getAJCstories,
					modifyCounts 	: modifyCounts,
					filterResults : filterResults
				};

			} // end function block

		]); // end factory

}()); // end iife