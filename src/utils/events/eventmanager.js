/**
Event manager. A simple way of adding multiple events to only one target,
if necessary.

@class EventManager
@constructor
@requires d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/eventmanager', function() {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory();
		});
	} else {
		/** Browser globals */
		root.EventManager = factory();
	}
}(this, function() {

	function EventManager() {

	}

}));