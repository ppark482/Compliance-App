;(function () {
	'use strict'

/*//////////////////////////////////////////////////////////////////////////////
// 
// Service for analysis page
// 
//////////////////////////////////////////////////////////////////////////////*/
	
	angular.module('complianceApp')

		.factory('AnalysisFactory', ['$rootScope', '$q',

			function ($rootScope, $q) {

				var currentStories;
				var getPercentage;
				var date = "Monday, 1/1/15";
				var pieChart;

				var sendStories = function (stories) {
					currentStories = stories;
				};

				var getStories = function () {
					var deferred = $q.defer();
					deferred.resolve(currentStories);
					return deferred.promise;
				};

				var storyCount = {
					ajc : 0,
					myajc : 0,
					accessStories : 0,
					wordpressVip : 0,
					publishThis : 0,
					apStories : 0,
					galleries : 0
				};

				var findCounts = function () {
					var isPhotoGallery = function (x) {
						if (x.item_class === "https://cv.cmgdigital.com/item_class/composite/photos.medleygallery/") {
							storyCount.galleries++;
						}
					};
					angular.forEach(currentStories, function (x) {
						if (x.provider.name === 'WordPress VIP') {
							isPhotoGallery(x);
							storyCount.wordpressVip++;
						} else if (x.provider.name === 'PublishThis') {
							isPhotoGallery(x);
							storyCount.publishThis++;
						}	else if (x.provider.name === 'For the AJC') {
							isPhotoGallery(x);
							storyCount.myajc++;
						} else if (x.provider.name === 'www.ajc.com') {
							isPhotoGallery(x);
							storyCount.ajc++;
						}	else if (x.provider.name === 'The Atlanta Journal-Constitution') {
							isPhotoGallery(x);
							storyCount.accessStories++;
						}	else if (x.provider.name === 'The Associated Press') {
							isPhotoGallery(x);
							storyCount.apStories++;
						}
					});
					console.log(storyCount);
					createPieChart();
				}; // end findCounts

				var createPieChart = function () {
					pieChart = {
						chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
		        },
		        title: {
		            text: 'Breakdown of Content'
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f}',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Content Composition',
		            data: [
		                ['AJC',   storyCount.ajc],
		                ['MyAJC',       storyCount.myajc],
		                ['Access Stories',    storyCount.accessStories],
		                ['Wordpress VIP',     storyCount.wordpressVip],
		                ['PublishThis',     storyCount.publishThis],
		                ['AP Stories',     storyCount.apStories],
		                ['Galleries',   storyCount.galleries]
		            ]
		        }]
					}; // end piechart
				};
				// var chart = {
				// 	chart: {
	   //          zoomType: 'xy'
	   //      },
	   //      title: {
	   //          text: 'Daily Content Produced vs. Pageviews'
	   //      },
	   //      subtitle: {
	   //          text: 'Source: Medley Data'
	   //      },
	   //      xAxis: [{
	   //          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	   //              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	   //          crosshair: true
	   //      }],
	   //      yAxis: [{ // Primary yAxis
	   //          labels: {
	   //              format: '{value}°C',
	   //              style: {
	   //                  color: Highcharts.getOptions().colors[1]
	   //              }
	   //          },
	   //          title: {
	   //              text: 'Temperature',
	   //              style: {
	   //                  color: Highcharts.getOptions().colors[1]
	   //              }
	   //          }
	   //      }, { // Secondary yAxis
	   //          title: {
	   //              text: 'Rainfall',
	   //              style: {
	   //                  color: Highcharts.getOptions().colors[0]
	   //              }
	   //          },
	   //          labels: {
	   //              format: '{value} mm',
	   //              style: {
	   //                  color: Highcharts.getOptions().colors[0]
	   //              }
	   //          },
	   //          opposite: true
	   //      }],
	   //      tooltip: {
	   //          shared: true
	   //      },
	   //      legend: {
	   //          layout: 'vertical',
	   //          align: 'left',
	   //          x: 120,
	   //          verticalAlign: 'top',
	   //          y: 100,
	   //          floating: true,
	   //          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	   //      },
	   //      series: [{
	   //          name: 'Rainfall',
	   //          type: 'column',
	   //          yAxis: 1,
	   //          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
	   //          tooltip: {
	   //              valueSuffix: ' mm'
	   //          }

	   //      }, {
	   //          name: 'Temperature',
	   //          type: 'spline',
	   //          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
	   //          tooltip: {
	   //              valueSuffix: '°C'
	   //          }
	   //      }]
	   //    };

	      var getPieChart = function () {
					findCounts();
	      	return pieChart;
	      };

				return {
					sendStories : sendStories,
					getStories : getStories,
					getPieChart : getPieChart
				}

			} // end function  block

		]); // end factory

}()); // end iife