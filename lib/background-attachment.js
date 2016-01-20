(function(document){
	'use strict';

	var SELECTOR_PICTURES = '[data-fixed-picture]';
	var ELEMENT_CLASS = 'fixed-scroller';

	var $Images = [];

	function addClass(el, nameOfClass) {
		if (el.classList){
			el.classList.add(nameOfClass);
		} else {
			el.className += ' ' + nameOfClass;
		}
	}

	function currentSrcSupport(el) {
		// Checks if currentSrc is supported.
		if(typeof el.currentSrc !== 'undefined') {
			return el.currentSrc;
		} else {
			return el.getAttribute('src');
		}
	}

	function createScroller(picture) {
		// Create the div that will act in place of the picture
		var Scroller = document.createElement('div');
		// Add the data attribute for us to use for styling
		addClass(Scroller, ELEMENT_CLASS);
		// Insert it into the DOM within the picture element
		picture.appendChild(Scroller);
		return Scroller;
	}

	function updateScroller(i) {
		var pictureSrc = currentSrcSupport($Images[i].source);

		$Images[i].scroller.style.backgroundImage = 'url('+ pictureSrc +')';
	}

	function resetImageSources() {
		var i;
		// Loop through the $Images array and update the scrolled blocks with the new sources of the picture elements
		for(i = 0; i < $Images.length; i++) {
			updateScroller(i);
		}
	}

	function setupOnloadEvent(element, id) {
		// Update the picture element when it loads if it hasn't already
		element.onload = function() {
			updateScroller(id);
		};
	}

	function hideSourceImage(element) {
		// Hide the picture element from view
		element.style.left     = '-100%';
		element.style.position = 'relative';
	}

	function setupSourceImage(picture, scrollerId) {
		var Source = picture.querySelectorAll('img')[0];

		hideSourceImage(Source);
		setupOnloadEvent(Source, scrollerId);

		$Images[scrollerId].source = Source;
	}

	function setupPicture(picture) {
		var scrollerId;

		$Images.push({
			// Create the element used to provide the scrolling image
			scroller: createScroller(picture),
			source:   null
		});

		// Get the scroller id
		scrollerId = $Images.length - 1;
		// Get the image used to grab the current source from
		setupSourceImage(picture, scrollerId);
		// Update the created block with
		updateScroller(scrollerId);
	}

	function setupEvents() {
		// change image source on window resize.
		window.onresize = function() {
			resetImageSources();
		};
	}

	function init() {
		// Get all of the picture elements that we want to extend
		var fixedPictures = document.querySelectorAll(SELECTOR_PICTURES);

		// Check if there are any in the page
		if(fixedPictures.length > 0) {

			// Loop through the pictures and sets up the additional elements
			for(var i = 0; i < fixedPictures.length; i++) {
				setupPicture(fixedPictures[i]);
			}

			setupEvents();
		}
	}

	// check for existing elements before we run our code.
	init();

})(document);
