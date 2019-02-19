jQuery(function() {
	var $ = jQuery,
		$window = jQuery(window),
		$document = jQuery(document),
		docHeight = $document.innerHeight(),
		winWidth = $window.innerWidth(),
		winHeight = $window.innerHeight(),
		scrolled = jQuery(window).scrollTop(),
		$body = jQuery("body");

	/**
	* --------------------------------------------------------------------------
	* EVENTS
	* --------------------------------------------------------------------------
	*/

	$window.on('resize', function(){
		updateOnResize();
	});

	$window.on('scroll', function(event){
		
	});

	$window.on('load', function(){
		
	});

	$document.on('ready', function () {
		
	});

	var updateOnResize = debounce(function() {
		updateValueOnResize();
		updateStyleOnResize();
	}, 250);

	function updateValueOnResize() {
		winWidth = $window.innerWidth();
		winHeight = $window.innerHeight();
		quote_p_height = $('.review-style1 .review-style1-quote p').outerHeight();
	}

	function updateStyleOnResize() {
		auto_pantay();
	}

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};


	/*==============================
	  MATERIALIZE BUTTON
	================================*/
	
	$('.btn').click(function (e) {
		var target = e.target;
		var rect = target.getBoundingClientRect();
		var ripple = target.querySelector('.ripple');
		$(ripple).remove();
		ripple = document.createElement('span');
		ripple.className = 'ripple';
		ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		target.appendChild(ripple);
		var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  $('body,html').scrollTop();
		var left = e.pageX - rect.left - ripple.offsetWidth / 2 - $('body,html').scrollLeft();
		ripple.style.top = top + 'px';
		ripple.style.left = left + 'px';
		// return false;
		// e.preventDefault();
	});




	/*==============================
	  OVERRIDE MODAL
	================================*/
	$("body").on("shown.bs.modal", ".modal", function() {
		$(".modal-backdrop").length || ($modal_dialog = $(this).children(".modal-dialog"),
		$modal_dialog.hasClass("modal-side") && ($(this).addClass("modal-scrolling"),
		$("body").addClass("scrollable")),
		$modal_dialog.hasClass("modal-frame") && ($(this).addClass("modal-content-clickable"),
		$("body").addClass("scrollable")))
	}),
	$("body").on("hidden.bs.modal", ".modal", function() {
		$("body").removeClass("scrollable")
	});


	/*==============================
	  WISTIA VIDEO
	================================*/
	// homepage BANNER
	var bannerVideo = Wistia.api('lqdusrvh9q');
	window.wistiaInit = function(W) {
	  W.options("my_video", {
		autoPlay: true
	  });
	};

	/*==============================
	  TESTIMONIAL 3 COLUMN SLIDER
	================================*/
	$('.reviews-style1-wrap').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
				{
				  breakpoint: 1201,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 1171,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		});

	/*=========================================
	  TESTIMONIAL 3 COLUMN HEIGHT OF THE QUOTE
	===========================================*/
	function auto_pantay() {
		var qHeight = $('.review-style1 .review-style1-quote p').length;
		if(qHeight >= 1){
			new ResponsiveAutoHeight('.review-style1 .review-style1-quote p')
		}
	}



	/**
	* --------------------------------------------------------------------------
	* ONLOAD FUNCTIONS
	* --------------------------------------------------------------------------
	*/
	auto_pantay();
	
});