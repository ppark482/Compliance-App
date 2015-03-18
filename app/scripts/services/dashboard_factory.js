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
					// convert yesterday to UTC
					start = start.toISOString();
					return encodeURIComponent('?s=content_modified:[' + start + ' TO ' + today + ']');
				}; // end getDates

/*//////////////////////////////////////////////////////////////////////////////
// 
	Pass Results Count Data Around
// 
//////////////////////////////////////////////////////////////////////////////*/
				var resultsCount;
				var sendCount = function (count) {
					resultsCount = count;
				};
				var getResultsCount = function () {
					return resultsCount;
				};

/*//////////////////////////////////////////////////////////////////////////////
// 
	Pass Time Since Data Around
// 
//////////////////////////////////////////////////////////////////////////////*/
				var timeSince;
				var sendTimeSince = function (time) {
					console.log(time);
					timeSince = time;
				};
				var getTimeSince = function () {
					return timeSince;
				};

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

/*//////////////////////////////////////////////////////////////////////////////
// 
	Gets AJC Stories from www.ajc.com OR PublishThis
	OR WordPress VIP OR The Atlanta Journal-Constitution
// 
//////////////////////////////////////////////////////////////////////////////*/
				var getAJCstories = function () {
					var deferred = $q.defer();
					var dateRange = getDates();
					// f=item_class:"https://cv.cmgdigital.com/item_class/composite/news.medleystory/"
					var query = encodeURIComponent('&f=provider_name:"www.ajc.com"+OR+provider_name:"The Associated Press"+OR+provider_name:"WordPress VIP"+OR+provider_name:"The Atlanta Journal-Constitution"+OR+item_class:"photo.medleygallery"');
					$.getJSON(url + dateRange + query + sortByRecent, function (data) {
						var filteredData = filterResults(data);

						deferred.resolve(filteredData);
					});
					return deferred.promise;
				};

/*//////////////////////////////////////////////////////////////////////////////
// 				
	Further filter results
	Query to API seems to drop parameters if there are too many parameters
	Add any new filters to this function block
	Don't forget to change dataObj.entities
// 
//////////////////////////////////////////////////////////////////////////////*/
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
						entities : noAutoLists, // change me for new filter
						links : data.links
					};
					return dataObj;
				};


				var providerCounts = {};
				// modify count displays
				var modifyCounts = function (data) {
					// object for collecting arrays of sorted objects
					// use to grab counts of each provider
					var tempProviderCounts = {
						ajc_stories 		: [],
						photo_galleries : [],
						wp_vip 					: [],
						publish_this 		: [],
						ap_stories 			: []
					};
					var isPhotoGallery = function (x) {
						if (x.item_class === "https://cv.cmgdigital.com/item_class/composite/photos.medleygallery/") {
							tempProviderCounts.photo_galleries.push(x);
						}
					};
					angular.forEach(data, function (x) {
						if (x.provider.name === 'WordPress VIP') {
							isPhotoGallery(x);
							tempProviderCounts.wp_vip.push(x);
						} else if (x.provider.name === 'PublishThis') {
							isPhotoGallery(x);
							tempProviderCounts.publish_this.push(x);
						} else if (x.provider.name === 'www.ajc.com') {
							isPhotoGallery(x);
							tempProviderCounts.ajc_stories.push(x);
						}	else if (x.provider.name === 'The Atlanta Journal-Constitution') {
							isPhotoGallery(x);
							tempProviderCounts.ajc_stories.push(x);
						}	else if (x.provider.name === 'The Associated Press') {
							isPhotoGallery(x);
							tempProviderCounts.ap_stories.push(x);
						}
					});
					providerCounts = tempProviderCounts;
				};

				var getSidebarCounts = function () {
					return providerCounts;
				};

				return {
					getTheDate				: getTheDate,
					sendCount					: sendCount,
					getResultsCount		: getResultsCount,
					sendTimeSince			: sendTimeSince,
					getTimeSince			: getTimeSince,
					getAJCstories			: getAJCstories,
					modifyCounts 			: modifyCounts,
					filterResults 		: filterResults,
					getSidebarCounts 	: getSidebarCounts
				};

			} // end function block

		]); // end factory

}()); // end iife