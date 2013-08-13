;(function($, window, document, undefined) {
	var pluginName = "lightModal",
		defaults = {
			height: 200,
			width: 400,
			//top: document.body.scrollTop  + ($(window).height()/2 - options.height/2),
			//left: $(window).width()/2 - options.width/2,
			topPosition: 0,
			leftPosition: 0,
			maskHeight: $(window).height(),
			maskWidth: $(window).width(),
			showSpinner: true,
			spinnerImgSrc: 'lib/images/anim_loading_work2.gif',
			loaderImgSrc: 'images/loader.gif',
			animateModal: true,
			animateSpeed: '1000',
			delaySpeed: '250',
			fadeSpeed: '2000',
			bindOverlay: true,
			disableButtons: true
		};

	function LightModal ( el, options ) {
		this.el = el;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	LightModal.prototype = {
		init: function () {
			var self = this;
			$('<section/>', {
				'class': 'overlay-screen'
			}).appendTo(this.el);

			if(this.settings.showSpinner) {
				$('<section class="spinner-block"><img src="' + this.settings.spinnerImgSrc + '" /></section>')
					.appendTo($('.overlay-screen'));
			}

			if( this.settings.bindOverlay) {
				$(this.el).bind('closeModal', function( e ){
					self._close();
				});

				$('.overlay-screen').on('click', function ( e ) {
					$(self.el).trigger('closeModal');
				})
			}

			this._create();
			return this;
		},

		_close: function() {
			$('.overlay-screen, .modal-block').remove();
		},

		_create: function() {
			$('.spinner-block').hide();
			// $('<section/>', {
			// 	'class': 'modal-container'
			// }).appendTo(this.el);
			$('<section/>', {
				'class': 'modal-block modal-border'
			})
			.height(this.settings.height)
			.width(this.settings.width)
			.appendTo('body');

		}
	}

	$.fn[ pluginName ] = function () {
		return this.each(function() {
			if( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new LightModal( this, arguments[0] ) );
			}
			else {
				$(this).data( "plugin_" + pluginName ).init();
			}
		})
	}

})(jQuery, window, document);