/*
The MIT License (MIT)

Copyright (c) 2013 Kianosh Pourian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
		return this.init();
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
				});

				$(document).on('keyup', function( e ) {
					if (e.keyCode == 27) {
						$(self.el).trigger('closeModal');
					}
				});

				$(this.el).on('click', '.modal-close', function( e ) {
					$(self.el).trigger('closeModal');
				});
			}

			this._create();
			this._loadModal(this.settings.content);
			return this;
		},

		clearModal: function() {
			LightModal.prototype['_close'].call();
		},

		_close: function () {
			$('.modal-block').fadeOut('slow', function() {
				$('.overlay-screen, .modal-block').remove();
			});

			return this;
		},

		_create: function () {
			$('.spinner-block').hide();

			var modalClasses = this._assembleModalClass();

			this.modalBlock = $('<section/>', {
				'class': modalClasses
			})
			.height(this.settings.height)
			.width(this.settings.width)
			.appendTo('body');

			this.modalClose = $('<section/>', {
				'class': 'modal-close'
			}).appendTo(this.modalBlock);

			return this;
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

		_loadModal: function (thisHTML) {
			$(this.modalBlock).append(thisHTML);

			return this;
		}
	}

	$.fn[ pluginName ] = function (method) {
		return this.each(function () {
			if ( LightModal.prototype[method] ) {
				LightModal.prototype[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			} else if( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new LightModal( this, $.fn[ pluginName ].arguments[0] ) );
			} else {
				$(this).data( "plugin_" + pluginName ).init();
			}
		})
	}

})(jQuery, window, document);