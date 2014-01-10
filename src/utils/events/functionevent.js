/**
When an event occurs, a defined function will be exectuted.
This is for events that don't depende on an specific API.

@class FunctionEvent
@constructor
@requires d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/functionevent', function() {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory();
		});
	} else {
		/** Browser globals */
		root.FunctionEvent = factory();
	}
}(this, function() {

	function FunctionEvent() {

	}

}));