/**
Event manager. A simple way of adding multiple events to only one target,
if necessary.

Since d3 works over selections, a "target" will represent an element selection,
so manager won't be working over only one element, but for the collection itself.

@class EventManager
@constructor
@requires functionevent,
					bootstrapevent,
					underscore

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/eventmanager', [
			'charty/functionevent',
			'charty/bootstrapevent',
			'underscore'
		], function (FunctionEvent, BootstrapEvent, _) {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory(FunctionEvent, BootstrapEvent, _);
		});
	} else {
		/** Browser globals */
		root.EventManager = factory(FunctionEvent, BootstrapEvent, _);
	}
}(this, function (FunctionEvent, BootstrapEvent, _) {

	/**
	 * Class constructor
	 *
	 * @param t Target selection
	 */
	function EventManager(t) {

		this.events = [];
		this.t = t;
	}

	/**
	 * Adds specific defined event to queue
	 *
	 * @method
	 * @param e Charty event to bind
	 * @chainable
	 */
	EventManager.prototype.addEvent = function(e) {
		this.events.push(e);

		return this;
	};

	/**
	 * Binds all available events to specified targets.
	 *
	 * Each event wrapper must have a way to bind itself to the specified
	 * elements.
	 *
	 * @chainable
	 */
	EventManager.prototype.bindAll = function() {
		_.each(this.events, function(e) {
			e.bind(this.t);
		});

		return this;
	};

	return EventManager;

}));