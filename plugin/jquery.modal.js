(function($) {
	var methods = {
			init: function(options) {
				var defaults = {
						'height': 100,
						'width': 200,
						'top': document.body.scrollTop  + ($(window).height()/2 - options.height/2),
						'left': $(window).width()/2 - options.width/2,
						'topPosition': 0,
						'leftPosition': 0,
						'maskHeight': $(window).height(),
						'maskWidth': $(window).width(),
						'showSpinner': true,
						'spinnerImgSrc': 'images/anim_loading_work2.gif',
						'loaderImgSrc': 'images/loader.gif',
						'animateModal': true,
						'animateSpeed': '1000',
						'delaySpeed': '250',
						'fadeSpeed': '2000',
						'bindOverlay': true
				};

				var opts = $.extend({}, defaults, options);
				return this.each(function() {
					$(this).modal('createMask', opts);
					$(this).modal('createModalBox', opts);
				});
			},
			createMask: function(opts) {
				$(this).after('<div id="overlay"></div>');
				$('#overlay')
			      .height(opts.maskHeight)
			      .width(opts.maskWidth)
			      .css({
			         'top': opts.topPosition,
			         'left': opts.leftPosition
			      });
				$('<div id="innerOverlay"></div>').appendTo($("#overlay"));
				$('#innerOverlay')
					.width($(this).width())
					.css({
						'margin-top': opts.maskHeight/3
					});
				if(opts.showSpinner)
					$('#innerOverlay').html('<img src="' + opts.spinnerImgSrc + '" />');
				return this;
			},
			createModalBox: function(opts) {
				if(opts.bindOverlay) {
					$('#overlay').bind('click', function() {
						$(this).modal('close');
					});
				}

				$(this).after('<div id="modalBox"></div>');
				if (opts.animateModal) {
					$('#modalBox').animate({
						'top': opts.top,
						'left': opts.left,
						'width': opts.width,
						'height': opts.height
					}, '1000', 'swing'
					, function(){
						if($.browser.msie){
							$('#modalBox').after('<div id="modalBoxShadow"></div>');
							$('#modalBoxShadow')
							.height(opts.height)
							.width(opts.width)
							.css({
								'top': opts.top + 15,
								'left': opts.left + 5
							}).show();
						}
					}
					);
				} else {
					$('#modalBox')
						.height(opts.height)
						.width(opts.width)
						.css({
							'top': opts.top,
							'left': opts.left
						});

					if($.browser.msie){
						$('#modalBox').after('<div id="modalBoxShadow"></div>');
						$('#modalBoxShadow')
						.height(opts.height)
						.width(opts.width)
						.css({
							'top': opts.top + 15,
							'left': opts.left + 5
						});				
					}
				}
				
				$('#modalBox').html('<span class="configuring">Loading<br/><img src="' + opts.loaderImgSrc + '"/></span>');

				return this;
			},
			close: function() {
				return this.each(function(){
					$('#overlay, #modalBox').remove();
					if($.browser.msie) {
						$('#modalBoxShadow').remove();
					}
				});
			},
			openAlert: function(opts) {
				$(this).modal('createMask', opts);
				$(this).modal('createModalBox', opts);
				return this;
			},
			updateContent: function(data) {
				return this.each(function() {
					$('#modalBox').html(data);
					$('#modalContent').delay('250').fadeIn('2000');
					if($.browser.msie) {
						$('#modalBoxShadow').delay('250')
						.height($('#modalContent').height());
					}
				});
			},
			showProgressInModal: function(opts) {
				if(opts.disableButtons) {
					if($.browser.msie) {
						$('input[type=button]').attr("disabled", "true");
						$('input[type=submit]').attr("disabled", "true");
						$('button').attr("disabled", "true");
					} else {
						$(':button').attr("disabled", "true");
					}
				}
				var contentDiv = "#" + opts.contentId;
				$(contentDiv).html(progressIndicator);
				$(contentDiv).show();
			},
			showModalErrorMsg: function(opts) {
				$("#modalMessage").empty();
				$('<span class="error"></span>').appendTo($("#modalMessage"));
				$("#modalMessage span.error").html(opts.errorMsg);
				$("#modalMessage").show();
				$(':button').removeAttr('disabled');
			}
	};

	$.fn.modal = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.modal' );
		}
	};
})(jQuery);