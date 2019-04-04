

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
		navWidth = jQuery('.navbar-nav > li').innerWidth(),
		scrollTime = 0.3,
		scrollDistance = 170;

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
		navSlide();
		megamenu();
		topPadding(); //this must be below megamenu()
		subpageUrl();
	});

	$document.on('ready', function () {

	});

	$window.on("mousewheel DOMMouseScroll", function(event){
		// event.preventDefault();
		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		var scrollTop = $window.scrollTop();
		var finalScroll = scrollTop - parseInt(delta*scrollDistance);

		// TweenMax.to($window, scrollTime, {
		// 	scrollTo: { y: finalScroll, autoKill:true },
		// 		ease: Power1.easeOut,
		// 	autoKill: true,
		// 	overwrite: 5
		// });
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
		navHeight = jQuery('nav').outerHeight(true) - 10;
		navWidth = jQuery('.navbar-nav > li').innerWidth();
	}

	function updateStyleOnResize() {
		auto_pantay();
		navSlide();
		megamenu();
		topPadding(); //this must be below megamenu()


		// var pricePage = $("[data-toggle='tooltip']").length;
		// if(pricePage >= 1) {
		// 	if (winWidth <=767) {
		// 		$("[data-toggle='tooltip']").tooltip({
		// 			placement: 'top',
		// 			viewport: {selector: '.plan-feature-col .plan-feature-wrap ul li > div' },
		// 		});
		// 		console.log(1);
		// 	} else {
		// 		$("[data-toggle='tooltip']").tooltip({
		// 			placement: 'right',
		// 			viewport: {selector: '.plan-feature-col .plan-feature-wrap ul li > div',},
		// 		});
		// 	}
		// }
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
	auto_pantay();
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

	/*======================================
	  BODY TOP SPACING FOR THE NAV
	========================================*/
	topPadding();
	function topPadding() {
		if(winWidth >= 992) {
			$(".submenu").css('top', navHeight);
			$("body").css('padding-top', navHeight);
		} else if(winWidth <= 991) {
			$("body").css('padding-top', 0);
			$("body").css('padding-top', navHeight);
			$(".submenu").attr('style', function(i, style) {
				return style && style.replace(/display[^;]+;?/g, '');
			});
		}
	}

	/*======================================
	  SLIDING ACTIVE LINE ON NAV
	========================================*/
	navSlide();
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
	megamenu();
	function megamenu() {
		var mainNav = $("#navbar ul"),
			btnBack = $(".submenu-back"),
			findMenu = $(".nav-wrap").children("#navbar").length,
			bodyMenu = $("body").children("#navbar").length,
			// bodyNav = $("body").children("nav").length,
			// navTop = $(".st-pusher").children(".navbar-fixed-top").length,
			bodyWrapped = $("body > .wrap-all").length,
			mainNavLi = $("#navbar ul li a, #navbar ul li p");

		$('#navbar .nav.navbar-nav li:has(ul)').addClass('has-child');

		if(winWidth >= 992){
			$body.removeClass('open');

			if(bodyWrapped >= 1) {
				$(".wrap-all").replaceWith(function () { return $(this).html(); });
			}
			if(bodyMenu >=1) {
				$("#navbar").insertBefore(".menu-icons");
			}
		} else if(winWidth <= 991){
			$body.removeClass('open-overlay');
			if(bodyWrapped != 1) {
				$("body > *").wrapAll("<div class='wrap-all'></div>");
				$(".navbar-fixed-top").prependTo("body");
			}
			// if(findMenu >= 1) {
				// $("#navbar").prependTo(".st-pusher");
				// $(".navbar-fixed-top").appendTo("body");
			// }

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
				var p = mainNav.find('li.active').removeClass('open active').closest('.open');

				if (p.closest(mainNav).length) {
					p.addClass('active')
				} else {
					btnBack.removeClass('active');
				}
			});
		}


		$(".navbar-toggle").on("click", function(e){
			e.preventDefault();
			$(".wrap-all, #navbar, body, .navbar-fixed-top").addClass("open");
		});

		$('body').on("click", ".menu-overlay, .menu-close", function(e){
			$(".search-box, .caspio-search-reveal").removeClass("active");
			e.preventDefault();
			$(".wrap-all, #navbar, body, .navbar-fixed-top").removeClass("open");
			btnBack.removeClass('active');
			mainNav.find('.open').removeClass('open');
			$body.removeClass('open-overlay');
		});

		$(".caspio-search-reveal").on("click", function(e){
			e.preventDefault();
			$body.addClass('open-overlay');
			$(".search-box, .caspio-search-reveal").addClass("active");
		});
	}


	/*============================================
	  BUG FIX FOR IE11 BACKGROUND-ATTACHMENT FIXED
	==============================================*/
	if(navigator.userAgent.match(/Trident\/7\./)) {
		document.body.addEventListener("mousewheel", function() {
			event.preventDefault();
			var wd = event.wheelDelta;
			var csp = window.pageYOffset;
			window.scrollTo(0, csp - wd);
		});
	}

	/*============================================
	  SCROLL SPY
	==============================================*/
	var SMOOTH_SCROLL_DURATION = 700;
	$(".smooth-scroll").on("click", "a", function() {
		var e = $(this).attr("href");
		if (void 0 !== e && 0 === e.indexOf("#")) {
			var t = $(this).attr("data-offset") ? $(this).attr("data-offset") : 0
			  , n = $(this).parentsUntil(".smooth-scroll").last().parent().attr("data-allow-hashes");
			return $("body,html").animate({
				scrollTop: $(e).offset().top - t - navHeight
			}, SMOOTH_SCROLL_DURATION),
			void 0 !== n && !1 !== n && history.replaceState(null, null, e),
			!1
		}
	}),
	function(e) {
		e.fn.scrollTo = function(t) {
			return e(this).scrollTop(e(this).scrollTop() - e(this).offset().top + e(t).offset().top),
			this
		}
		,
		e.fn.dropdown = function(t) {
			this.each(function() {
				var n = e(this)
				  , i = e.extend({}, e.fn.dropdown.defaults, t)
				  , r = !1
				  , o = e("#".concat(n.attr("data-activates")));
				function a() {
					void 0 !== n.data("induration") && (i.inDuration = n.data("inDuration")),
					void 0 !== n.data("outduration") && (i.outDuration = n.data("outDuration")),
					void 0 !== n.data("constrainwidth") && (i.constrain_width = n.data("constrainwidth")),
					void 0 !== n.data("hover") && (i.hover = n.data("hover")),
					void 0 !== n.data("gutter") && (i.gutter = n.data("gutter")),
					void 0 !== n.data("beloworigin") && (i.belowOrigin = n.data("beloworigin")),
					void 0 !== n.data("alignment") && (i.alignment = n.data("alignment"))
				}
				function s(t) {
					"focus" === t && (r = !0),
					a(),
					o.addClass("active"),
					n.addClass("active"),
					!0 === i.constrain_width ? o.css("width", n.outerWidth()) : o.css("white-space", "nowrap");
					var s = window.innerHeight
					  , l = n.innerHeight()
					  , c = n.offset().left
					  , u = n.offset().top - e(window).scrollTop()
					  , d = i.alignment
					  , f = 0
					  , h = 0
					  , p = 0;
					!0 === i.belowOrigin && (p = l);
					var g = 0
					  , m = n.parent();
					if (!m.is("body") && m[0].scrollHeight > m[0].clientHeight && (g = m[0].scrollTop),
					c + o.innerWidth() > e(window).width() ? d = "right" : c - o.innerWidth() + n.innerWidth() < 0 && (d = "left"),
					u + o.innerHeight() > s)
						if (u + l - o.innerHeight() < 0) {
							var v = s - u - p;
							o.css("max-height", v)
						} else
							p || (p += l),
							p -= o.innerHeight();
					if ("left" === d)
						f = i.gutter,
						h = n.position().left + f;
					else if ("right" === d) {
						h = n.position().left + n.outerWidth() - o.outerWidth() + (f = -i.gutter)
					}
					o.css({
						position: "absolute",
						top: n.position().top + p + g,
						left: h
					}),
					o.stop(!0, !0).css("opacity", 0).slideDown({
						queue: !1,
						duration: i.inDuration,
						easing: "easeOutCubic",
						complete: function() {
							e(this).css("height", "")
						}
					}).animate({
						opacity: 1,
						scrollTop: 0
					}, {
						queue: !1,
						duration: i.inDuration,
						easing: "easeOutSine"
					})
				}
				function l() {
					r = !1,
					o.fadeOut(i.outDuration),
					o.removeClass("active"),
					n.removeClass("active"),
					setTimeout(function() {
						o.css("max-height", "")
					}, i.outDuration)
				}
				if (a(),
				n.after(o),
				i.hover) {
					var c = !1;
					n.unbind("click.".concat(n.attr("id"))),
					n.on("mouseenter", function() {
						!1 === c && (s(),
						c = !0)
					}),
					n.on("mouseleave", function(t) {
						var n = t.toElement || t.relatedTarget;
						e(n).closest(".dropdown-content").is(o) || (o.stop(!0, !0),
						l(),
						c = !1)
					}),
					o.on("mouseleave", function(t) {
						var i = t.toElement || t.relatedTarget;
						e(i).closest(".dropdown-button").is(n) || (o.stop(!0, !0),
						l(),
						c = !1)
					})
				} else
					n.unbind("click.".concat(n.attr("id"))),
					n.bind("click.".concat(n.attr("id")), function(t) {
						r || (n[0] !== t.currentTarget || n.hasClass("active") || 0 !== e(t.target).closest(".dropdown-content").length ? n.hasClass("active") && (l(),
						e(document).unbind("click.".concat(o.attr("id"), " touchstart.").concat(o.attr("id")))) : (t.preventDefault(),
						s("click")),
						o.hasClass("active") && e(document).bind("click.".concat(o.attr("id"), " touchstart.").concat(o.attr("id")), function(t) {
							o.is(t.target) || n.is(t.target) || n.find(t.target).length || (l(),
							e(document).unbind("click.".concat(o.attr("id"), " touchstart.").concat(o.attr("id"))))
						}))
					});
				n.on("open", function(e, t) {
					s(t)
				}),
				n.on("close", l)
			})
		}
		,
		e.fn.dropdown.defaults = {
			inDuration: 300,
			outDuration: 225,
			constrain_width: !0,
			hover: !1,
			gutter: 0,
			belowOrigin: !1,
			alignment: "left"
		},
		e(".dropdown-button").dropdown(),
		e.fn.mdbDropSearch = function(t) {
			var n = e(this).find("input");
			this.filter(function(t, i) {
				e(i).on("keyup", function() {
					for (var e = n.closest("div[id]").find("a, li"), t = 0; t < e.length; t++)
						e.eq(t).html().toUpperCase().indexOf(n.val().toUpperCase()) > -1 ? e.eq(t).css({
							display: ""
						}) : e.eq(t).css({
							display: "none"
						})
				})
			});
			var i = e.extend({
				color: "#000",
				backgroundColor: "",
				fontSize: ".9rem",
				fontWeight: "400",
				borderRadius: "",
				borderColor: ""
			}, t);
			return this.css({
				color: i.color,
				backgroundColor: i.backgroundColor,
				fontSize: i.fontSize,
				fontWeight: i.fontWeight,
				borderRadius: i.borderRadius,
				border: i.border,
				margin: i.margin
			})
		}

	}(jQuery);

	/*============================================
	  URL REWRITE
	==============================================*/
	subpageUrl();
	function subpageUrl(){
		if(url == github) {
			$('a').each(function(){
				var a = $(this).attr("href")
				$(this).attr("href", github + "caspio-components/" + a);
			});
		}//  else {
		// 	$('a').each(function(){
		// 		var a = $(this).attr("href")
		// 		$(this).attr("href", '/' + a);
		// 	});
		// }
	}

	/*============================================
	  PRICING PAGE
	==============================================*/
	

	// var pricePage = $("[data-toggle='tooltip']").length;
	// if(pricePage >= 1) {
	// 	$(window).on('resize', function() {
	// 		var pos = (winWidth < 768) ? 'top' : 'right';
	// 		$("[data-toggle='tooltip']").tooltip('destroy').tooltip({
	// 			'placement': pos,
	// 			'viewport' :{selector: '.plan-feature-col .plan-feature-wrap ul li > div',}
	// 		});
	// 	}).trigger('resize');
	// }


	/*============================================
	  FIXED BUTTON
	==============================================*/

	var fixBtn = $(".btn").hasClass("fixed-bottom-right");
	if(fixBtn == true) {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$(".fixed-bottom-right").removeClass("btn-hidden");
			} else {
				$(".fixed-bottom-right").addClass("btn-hidden");
			}
		});
	}

	/**
	* --------------------------------------------------------------------------
	* ONLOAD FUNCTIONS
	* --------------------------------------------------------------------------
	*/

});

/*============================================
  URL FIX
==============================================*/
var urlFix = function() {
	url = window.location.origin + '/';
	currUrl = window.location.href;
	pathUrl = window.location.pathname;
	filename = pathUrl.substring(pathUrl.lastIndexOf('/')+1);
	github = 'https://lhorainemarinas.github.io/';
	if(url == github) {
		$("#includeNav").load(url + "/caspio-components/template/nav.html");
		$("#includeNav2").load(url + "/caspio-components/template/nav2.html");
	} else {
		$("#includeNav").load(url + "/template/nav.html");
		$("#includeNav2").load(url + "/template/nav2.html");
	}
}();
