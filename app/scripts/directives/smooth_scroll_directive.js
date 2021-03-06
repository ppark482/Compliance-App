;(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name complianceApp smooth scroll directive
	 * @description
	 * # creating anchor-smooth-scroll directive
	 */
	angular.module('complianceApp')
		.directive('anchorSmoothScroll', 
	  	function($location) {
		    return {
	        restrict: 'A',
	        replace: false,
	        scope: {
	            'anchorSmoothScroll': '@'
	        },
		 
					link: function($scope, $element, $attrs) {
            initialize();
            function initialize() {
              createEventListeners();
            }
	          function createEventListeners() {
	          	// listen for a click
	            $element.on('click', function() {
		            // set the hash like a normal anchor scroll
		            $location.hash($scope.anchorSmoothScroll);
	            	// smooth scroll to the passed in element
	              scrollTo($scope.anchorSmoothScroll);
              });
            } // end createEventListeners

            function scrollTo() {
              // This scrolling function 
              // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
              var i;
              var startY = currentYPosition();
              var stopY = elmYPosition(top);
              var distance = stopY > startY ? stopY - startY : startY - stopY;
              if (distance < 100) {
                  scrollTo(0, stopY); return;
              }
              var speed = Math.round(distance / 100);
              if (speed >= 20) speed = 20;
              var step = Math.round(distance / 25);
              var leapY = stopY > startY ? startY + step : startY - step;
              var timer = 0;
              if (stopY > startY) {
                for (i = startY; i < stopY; i += step) {
              	  setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                  leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                  } 
                  return;
              }
              for (i = startY; i > stopY; i -= step) {
              	setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY;
                timer++;
              }
            } // end scrollTo
	            
            function currentYPosition() {
              // Firefox, Chrome, Opera, Safari
              if (window.pageYOffset) {
                  return window.pageYOffset;
              }
              // Internet Explorer 6 - standards mode
              if (document.documentElement && document.documentElement.scrollTop) {
                  return document.documentElement.scrollTop;
              }
              // Internet Explorer 6, 7 and 8
              if (document.body.scrollTop) {
                  return document.body.scrollTop;
              }
              return 0;
            }

            function elmYPosition() {
              var elm = document.getElementById('top');
              var y = elm.offsetTop;
              var node = elm;
              while (node.offsetParent && node.offsetParent != document.body) {
                  node = node.offsetParent;
                  y += node.offsetTop;
              } return y;
            }
		      } // end link
		   	}; // end return
			} // end function block
		); // end directive
}()); // end iif