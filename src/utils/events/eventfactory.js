/**
Event factory. 

@class EventManager
@constructor
@requires functionevent,
					bootstrapevent

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
	/** Setting up AMD support*/
	if (typeof define === 'function' && define.amd) {
		/** AMD */
		define('charty/eventfactory', [
			'charty/functionevent',
			'charty/bootstrapevent',
		], function (FunctionEvent, BootstrapEvent) {
			/**
			 * Export global even in AMD case in case this script
			 * is loaded with others
			 * */
			return factory(FunctionEvent, BootstrapEvent);
		});
	} else {
		/** Browser globals */
		root.EventFactory = factory(FunctionEvent, BootstrapEvent);
	}
}(this, function (FunctionEvent, BootstrapEvent) {

	/** 
	Class constructor
	*/
	function EventFactory (){

	}

	/**
	Creates a specific Charty event object.

	@param {Object} e Defined event options
	@returns {Event} Charty event
	*/
	EventFactory.prototype.createEvent = function (e){

		var EventObject = null;

		switch (e.type){
			case 'function':
				EventObject = new FunctionEvent ({
					on : e.evt,
					execute : e.bind
				});
				break;
			case 'bootstrap':
				EventObject = new BootstrapEvent({
					trigger : e.evt,
					type : e.element,
					content : e.bind,
					placement : e.placement
				});
				break;
			default :
				break;
		}

		return EventObject;
	};

	return EventFactory;
}));