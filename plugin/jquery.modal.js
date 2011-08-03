/*
 * 
 * jquery.modal 1.0 - Simple modal/alert box creator
 * Version 1.0.0
 * @requires jQuery v1.5+
 * 
 * Copyright (c) 2011 Kianosh Pourian
 * 
 * @description This plugin will create the following (inidivdually or in conjunction):
 * - a masked layer
 * - a modal box or alert box
 * 
 * @requires modal.css file, anim_loading_working.gif, and loader.gif
 * 
 * @example $('#myId').modal();
 *
 * @example $('#myId').modal({options: opts});
 *
 * @option String height - Height of the modal/alert box
 * 
 * @option String width - Width of the modal/alert box 
 * 
 * @option String top - Centering the modal box vertically
 *
 * @option String left - Centering the modal box horizontally
 * 
 * @option String topPosition - Top position of the mask/overlay layer
 * 
 * @option String topLeft - Left position of the mask/overlay layer
 *
 * @option String maskHeight - Height of the mask layer under the modal/alert box
 *
 * @option String maskWidth - Width of the mask layer under the modal/alert box
 *
 * @option Boolean showSpinner - Boolean to show the spinner indicating background work
 *
 * @option String spinnerImgSrc - Image to use for spinner on the mask layer
 *
 * @option String loaderImgSrc - Image to use as an loader image within the modal/alert box
 *
 * @option Boolean animateModal - Boolean to animate the modal or simply show it
 *
 * @option String animateSpeed - If animation is desired, set the animation speed
 *
 * @option String delaySpeed - A delay is necessary between showing modal/alert box content
 *
 * @option String fadeSpeed - Fade in and out speed
 *
 * @option Boolean bindOverlay - Boolean to bind the closing of the modal box (for confirmation boxes, this should be false in order to force a button click)
 *
 * @option Booelan disbaleButtons - Boolean to disable all buttons on the modal/alert box when a task is in progress
 *
 * @type jQuery
 * 
 * @name jquery.modal
 * 
 * @cat Plugins/Modal
 * 
 * @author Kianosh Pourian
 */

(function($) {
	var opts;
	var methods = {
			/**
			* Initial function thay will set all the default values and also
			* set the assigned variables.
			*
			* @param options - Object containing all the options set by the user
			*/
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
						'bindOverlay': true,
						'disableButtons': true
				};

				opts = $.extend({}, defaults, options);
				return this;
			},
			/**
			* Function to create the mask layer and create the modal box
			*
			*/
			openModal: function() {
				return this.each(function() {
					$(this).modal('createMask', opts);
					$(this).modal('createModalBox', opts);
				});
			},
			/**
			* Function to create the mask layer
			*
			* @param opts - options set by the plugin
			*/
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
			/**
			* Function to create the mask modal box
			*
			* @param opts - options set by the plugin
			*/
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
			/**
			* Function to close the modal/alert box and its associated
			* mask layer
			*
			*/
			close: function() {
				return this.each(function(){
					$('#overlay, #modalBox').remove();
					if($.browser.msie) {
						$('#modalBoxShadow').remove();
					}
				});
			},
			/**
			* Function to open an alert box
			*
			* @param opts - options set by the plugin
			*/
			openAlert: function(opts) {
				$(this).modal('createMask', opts);
				$(this).modal('createModalBox', opts);
				return this;
			},
			/**
			* Function to update the content of the modal/alert box
			*
			* @param data - data to fill the box, this should be in the form of html
			*/
			updateContent: function(data) {
				return this.each(function() {
					$('#modalBox').html(data);
					$('#modalContent').delay(opts.delaySpeed).fadeIn(opts.fadeSpeed);
					if($.browser.msie) {
						$('#modalBoxShadow').delay(opts.delaySpeed)
						.height($('#modalContent').height());
					}
				});
			},
			/**
			* Function to show progress in a modal box when an action has been done.
			*
			* @param opts - options set by the plugin
			*/
			showProgressInModal: function(opts) {
				if(opts.disableButtons) {
					$(this).modal('disableButtons');
				}
				var contentDiv = "#" + opts.contentId;
				$(contentDiv).html(progressIndicator);
				$(contentDiv).show();
			},
			/**
			* Function to show error messages in the modal box after an action has failed.
			*
			* @param opts - options set by the plugin
			*/
			showModalErrorMsg: function(opts) {
				$("#modalMessage").empty();
				$('<span class="error"></span>').appendTo($("#modalMessage"));
				$("#modalMessage span.error").html(opts.errorMsg);
				$("#modalMessage").show();
				$(':button').removeAttr('disabled');
			},
			/**
			* Function to disable the buttons in the modal box when an action has been started.
			*
			*/
			disableButtons: function() {
				if($.browser.msie) {
					$('input[type=button]').attr("disabled", "true");
					$('input[type=submit]').attr("disabled", "true");
					$('button').attr("disabled", "true");
				} else {
					$(':button').attr("disabled", "true");
				}
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