/**
When an event occurs, a defined function will be exectuted.
This is for events that don't depende on an specific API.

@class FunctionEvent
@constructor
@requires d3

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/functionevent', [
			'd3'
			],
			function (d3) {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory(d3);
		});
	} else {
		/** Browser globals */
		root.FunctionEvent = factory(d3);
	}
}(this, function (d3) {

	/**
	 * Class constructor
	 *
	 * In the execute function, d represents a specific data element
	 *
	 * @param {Object} options = {
	 *                       on : 'click',
	 *                       execute : function (d) {}
	 *                       }
	 */
	function FunctionEvent(options) {

		this.opts = options;
	}

	/**
	 * Binds a function to a specific event
	 *
	 * @param {d3.selection} target Target to bind event
	 * @chainable
	 */
	FunctionEvent.prototype.bind = function(target) {

		target.on(this.opts.on, this.opts.execute);
		return this;
	};

	return FunctionEvent;

}));