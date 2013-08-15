;(function( $, window, document, undefined ) {
	var pluginName = "lightModal",
		defaults   = {
			height: 200,
			width: 400,
			showSpinner: true,
			spinnerImgSrc: 'lib/images/anim_loading_work2.gif',
			loaderImgSrc: 'images/loader.gif',
			animateModal: true,
			bindOverlay: true,
			addBorder: false,
			addShadow: false
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

				$(document).on('keyup', function( e ) {
					if (e.keyCode == 27) {
						$(self.el).trigger('closeModal');
					}
				})
			}

			this._create();
			return this;
		},

		_close: function () {
			$('.overlay-screen, .modal-block').remove();
		},

		_create: function () {
			$('.spinner-block').hide();

			var modalClasses = this._assembleModalClass();

			$('<section/>', {
				'class': modalClasses
			})
			.height(this.settings.height)
			.width(this.settings.width)
			.appendTo('body');
		},

		_assembleModalClass: function () {
			var classAssembly = 'modal-block',
			    seperator = ' ';
			if (this.settings.addBorder) {
				classAssembly += seperator + 'modal-border';
			}

			if (this.settings.addShadow) {
				classAssembly += seperator + 'modal-shadow';
			}

			return classAssembly;
		},

		_loadModal: function () {

		}
	}

	$.fn[ pluginName ] = function () {
		return this.each(function () {
			if( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new LightModal( this, arguments[0] ) );
			}
			else {
				$(this).data( "plugin_" + pluginName ).init();
			}
		})
	}

})(jQuery, window, document);