/**
Hooks to specified element a bootstrap feature (for instance, a popover).
Since data will be handled a specific way, a custom bootstrap event is given in
order to facilitate instantiation.

@class BootstrapEvent
@constructor
@requires d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/bootstrapevent', function() {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory();
		});
	} else {
		/** Browser globals */
		root.BootstrapEvent = factory();
	}
}(this, function() {

	function BootstrapEvent() {

	}

}));