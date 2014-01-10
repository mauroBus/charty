/**
Hooks to specified element a bootstrap feature (for instance, a popover).
Since data will be handled a specific way, a custom bootstrap event is given in
order to facilitate instantiation.

Note : since SVG element won't render contained divs, every element will
be added to the 'body' element. This workaround is easier than dealing with
SVG foreing objects.

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
	 * @param  d3.selection target Target selection
	 * @chainable
	 */
	BootstrapEvent.prototype.bind = function(target) {

		/**
		 * Traversing d3 structure to allow jquery bootstrap bindings
		 */
		_.each(this[0], function (element){

			var d3Element = d3.select(element);

			$(element)[this.opts.type]({
				placement : this.opts.placement,
				trigger : this.opts.trigger,
				htlm : true,
				container : 'body',
				context : d3Element,
				content : function (){
					return this.opts.content(d3Element);
				}
			});
		});

		return this;
	};

	return BootstrapEvent;

}));