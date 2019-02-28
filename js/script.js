jQuery(function() {
	var $ = jQuery,
		$window = jQuery(window),
		$document = jQuery(document),
		docHeight = $document.innerHeight(),
		winWidth = $window.innerWidth(),
		winHeight = $window.innerHeight(),
		container = jQuery(".container").innerWidth(),
		scrolled = jQuery(window).scrollTop(),
		$body = jQuery("body"),
		cpad = (winWidth-container)/2 + 'px',
		navHeight = jQuery('nav').outerHeight(true),
		$slider = jQuery('.menu-slider'),
		navWidth = jQuery('.navbar-nav > li').innerWidth();

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
		auto_pantay();
		topPadding();
		navSlide();
		megamenu();
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
		container = jQuery(".container").innerWidth();
		quote_p_height = $('.review-style1 .review-style1-quote p').outerHeight();
		cpad = (winWidth-container)/2 + 'px';
		navHeight = jQuery('nav').outerHeight(true);
		navWidth = jQuery('.navbar-nav > li').innerWidth();
	}

	function updateStyleOnResize() {
		auto_pantay();
		topPadding();
		navSlide();
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
	$('.reviews-style1-container .reviews-style1-wrap').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows: $('.reviews-style1-container .slick-arrows'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-left-arrow"></span></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-right-arrow"></span></button>',
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

	/*==============================
	  TESTIMONIAL 1 COLUMN SLIDER
	================================*/
	$('.reviews-style2-container .reviews-style2-wrap').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendArrows: $('.reviews-style2-container .slick-arrows'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-left-arrow"></span></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-right-arrow"></span></button>',
		});

	/*=========================================
	  TESTIMONIAL 3 COLUMN HEIGHT OF THE QUOTE
	===========================================*/
	function auto_pantay() {
		var qHeight = $('.review-style1 .review-style1-quote p').length,
			blogTitleHeight = $('.blog-style1-content').length,
			blogParHeight = $('.blog-style1-content > p').length,
			rsp = $('.review-style1-person').length;
		if(qHeight >= 1){
			new ResponsiveAutoHeight('.review-style1 .review-style1-quote p')
		}
		if(blogTitleHeight >= 1) {
			new ResponsiveAutoHeight('.blog-style1-content')
		}
		if(rsp >= 1) {
			new ResponsiveAutoHeight('.review-style1-person')
		}
	}

	/*======================================
	  BLOG CENTER MODE STYLE 1 SLICK SLIDER
	========================================*/
	$('.blog-style1-container .blog-style1-wrap').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: cpad,
		appendArrows: $('.blog-style1-container .slick-arrows'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-right-arrow"></span></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-right-arrow"></span></button>',
		responsive: [
				{
				  breakpoint: 1201,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: true,
				  }
				},
				{
				  breakpoint: 1129,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: false,
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: false,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: true,
				  }
				}
			]
		});

	/*======================================
	  BLOG CENTER MODE STYLE 2 SLICK SLIDER
	========================================*/
	$('.blog-style2-container .blog-style1-wrap').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: cpad,
		appendArrows: $('.blog-style2-container .slick-arrows'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-right-arrow"></span></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-right-arrow"></span></button>',
		responsive: [
				{
				  breakpoint: 1201,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: true,
				  }
				},
				{
				  breakpoint: 1129,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: false,
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: false,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: cpad,
					centerMode: true,
				  }
				}
			]
		});

	/*======================================
	  BODY TOP SPACING FOR THE NAV
	========================================*/
	function topPadding() {
		$("body").css('margin-top', navHeight);
		$(".megamenu").css('top', navHeight);
	}

	/*======================================
	  SLIDING ACTIVE LINE ON NAV
	========================================*/
	$slider.css('width',navWidth);
	function navSlide() {
		var $isActive = $('.navbar-nav > li.isactive'),
			isX = $isActive.position().left,
			isW = $isActive.innerWidth();

		$slider.css('width',navWidth);
		$(".navbar-nav > li").each(function(){
			var x = $(this).position().left,
				w = $(this).innerWidth();
			$(this).on({
				mouseenter: function(){
					$slider.css({'left': x, 'width': w});
				},
				mouseleave: function(){
					$slider.css({'left': isX, 'width': isW});
				}
			});
		});
	}

	/*========================
	  MEGAMENU
	==========================*/
	function megamenu() {
		$(".navbar-nav > li").each(function(index){
			$(this).attr("data-menu", index + 1);
		});
		$(".megamenu .submenu").each(function(index){
			$(this).attr("data-menu", index + 1);
		});
		$(".navbar-nav > li").each(function(){
			$(this).on({
				mouseenter: function(){
					$(".megamenu").addClass("open");
					var _li = $(this).attr("data-menu")
					$(".megamenu .submenu").each(function(){
						if($(this).attr("data-menu") == _li) {
							$(this).addClass("active").siblings().removeClass("active");
						}
					});
				},
				mouseleave: function(){
					$(".megamenu").removeClass("open");
					$(".megamenu .submenu.active").removeClass("active");
				}
			});
		});
	}

	/**
	* --------------------------------------------------------------------------
	* ONLOAD FUNCTIONS
	* --------------------------------------------------------------------------
	*/
	
});