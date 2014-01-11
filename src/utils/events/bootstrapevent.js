/**
Hooks to specified element a bootstrap feature (for instance, a popover).
Since data will be handled a specific way, a custom bootstrap event is given in
order to facilitate instantiation.

Note : since SVG element won't render contained divs, every element will
be added to the 'body' element. This workaround is easier than dealing with
SVG foreing objects.

Supported bootstrap features : popovers, tooltips.

@class BootstrapEvent
@constructor
@requires bootstrap

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support */
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/bootstrapevent', [
			'bootstrap',
			'underscore',
			'd3'
		], function ($, _) {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory($, _);
		});
	} else {
		/** Browser globals */
		root.BootstrapEvent = factory($, _);
	}
}(this, function ($, _) {

	/**
	Class constructor
	@param Object options example = {
																		type : 'popover',
																		placement: 'left',
																		trigger: 'click',
																		content : function () {}
																	}
	*/
	function BootstrapEvent(options) {
		this.opts = options;
	}

	/**
	 * Binds the bootstrap feature to a specified target selection
	 * @param  {d3.selection} target Target selection
	 * @chainable
	 */
	BootstrapEvent.prototype.bind = function(target) {

		var self = this;

		/**
		 * Traversing d3 structure to allow jquery bootstrap bindings
		 */
		_.each(target[0], function (element){

			var d3Element = d3.select(element);

			d3Element.attr('data-toggle', self.opts.type);

			$(element)[self.opts.type]({
				placement : self.opts.placement,
				trigger : self.opts.trigger,
				html : true,
				container : 'body',
				context : d3Element,
				content : function (){
					return self.opts.content(element);
				}
			});
		});

		return this;
	};

	return BootstrapEvent;
}));