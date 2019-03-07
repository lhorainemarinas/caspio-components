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

	$window.on('resize', createSlick , function(){
		updateOnResize();
	});

	$window.on('scroll', function(event){
		
	});

	$window.on('load', function(){
		createSlick();
		auto_pantay();
		navSlide();
		megamenu();
		topPadding(); //this must be below megamenu()
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
		navSlide();
		megamenu();
		topPadding(); //this must be below megamenu()
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
	

	/*=========================================
	  AUTO HEIGHT FOR DIFFERENT ELEMENTS
	===========================================*/
	function auto_pantay() {
		var qHeight = $('.review-style1 .review-style1-quote p').length,
			blogTitleHeight = $('.blog-style1-content').length,
			blogParHeight = $('.blog-style1-content > p').length,
			rsp = $('.review-style1-person').length,
			nav_feat = $('.submenu-right').length;
		if(qHeight >= 1){
			new ResponsiveAutoHeight('.review-style1 .review-style1-quote p')
		}
		if(blogTitleHeight >= 1) {
			new ResponsiveAutoHeight('.blog-style1-content')
		}
		if(rsp >= 1) {
			new ResponsiveAutoHeight('.review-style1-person')
		}
		if(nav_feat >= 1) {
			new ResponsiveAutoHeight('.submenu-right')
		}
	}

	function createSlick() {
		/*==============================
		  TESTIMONIAL 3 COLUMN SLIDER
		================================*/
		$('.reviews-style1-container .reviews-style1-wrap').not('.slick-initialized').slick({
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
		$('.reviews-style2-container .reviews-style2-wrap').not('.slick-initialized').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: $('.reviews-style2-container .slick-arrows'),
			prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-left-arrow"></span></button>',
			nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-right-arrow"></span></button>',
			});

		/*======================================
		  BLOG CENTER MODE STYLE 1 SLICK SLIDER
		========================================*/
		$('.blog-style1-container .blog-style1-wrap').not('.slick-initialized').slick({
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
		$('.blog-style2-container .blog-style1-wrap').not('.slick-initialized').slick({
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
	}

	/*======================================
	  BODY TOP SPACING FOR THE NAV
	========================================*/
	function topPadding() {
		if(winWidth >= 992) {
			$(".submenu").css('top', navHeight);
			$("body").css('padding-top', navHeight);
		} else if(winWidth <= 991) {
			$(".st-pusher, body").css('padding-top', 0);
			$(".st-pusher").css('padding-top', navHeight);
			$(".submenu").attr('style', function(i, style) {
				return style && style.replace(/display[^;]+;?/g, '');
			});
		}
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
		var varTime = 0,
			currentLi = '',
			mainNav = $("#navbar ul"),
			btnBack = $(".submenu-back"),
			findMenu = $(".nav-wrap").children("#navbar").length,
			bodyMenu = $("body").children("#navbar").length,
			menu_overlay = '<div class="menu-overlay"></div>',
			have_overlay = $("nav").children(".menu-overlay").length,
			bodyWrapped = $("body > .st-container").length,
			mainNavLi = $("#navbar ul li a, #navbar ul li p");

		$('#navbar .nav.navbar-nav li:has(ul)').addClass('has-child');

		if(winWidth >= 992){
			$(".menu-overlay").remove();
			if(bodyWrapped >= 1) {
				$(".st-pusher").replaceWith(function () { return $(this).html(); });
				$(".st-container").replaceWith(function () { return $(this).html(); });
			}
			if(bodyMenu >=1) {
				$("#navbar").insertBefore(".menu-icons");
			}
			$(".caspio-search-reveal").on("click", function(e){
				e.preventDefault();
				$("body").prepend(menu_overlay);
				$(".search-box, .caspio-search-reveal").addClass("active");
			});
		} else if(winWidth <= 991){
			if(bodyWrapped != 1) {
				$("body > *").wrapAll("<div class='st-container'><div class='st-pusher'></div></div>");
			}
			if(findMenu >=1) {
				$("#navbar").prependTo(".st-pusher");
			}
			if (have_overlay == 0) {
				$("nav").prepend(menu_overlay);
			} else {
				$(".menu-overlay").remove();
			}
			mainNavLi.on("click",function(e){
				var _this = $(this);
				if ($(this).siblings('.submenu').length) {
					if (mainNav.length) {
						btnBack.addClass('active');
					} else {
						btnBack.removeClass('active');
					}
				}
				_this.closest('li.active').removeClass('active');
				_this.closest("li").addClass('open active').siblings().removeClass('open');

			});
			btnBack.click(function (e) {
				// e.preventDefault();
				var p = mainNav.find('li.active').removeClass('open active').closest('.open');
				
				if (p.closest(mainNav).length) {
					p.addClass('active')
				} else {
					btnBack.removeClass('active');
				}
			});
		}
		

		$(".navbar-toggle").on("click", function(e){
			var menuOverlay = $(".menu-overlay");
			e.preventDefault();
			menuOverlay.fadeIn();
			$(".st-container, body").addClass("open");
		});

		$(".menu-overlay, .menu-close").on("click", function(e){
			$(".search-box, .caspio-search-reveal").removeClass("active");
			console.log(1)
			e.preventDefault();
			$(".st-container, body").removeClass("open");
			btnBack.removeClass('active');
			mainNav.find('.open').removeClass('open');
			$(".menu-overlay").fadeOut();
		});
		$(".caspio-search-reveal").on("click", function(e){
			var menuOverlay = $(".menu-overlay");
			e.preventDefault();
			menuOverlay.fadeIn();
		});
	}


	/**
	* --------------------------------------------------------------------------
	* ONLOAD FUNCTIONS
	* --------------------------------------------------------------------------
	*/
	
});