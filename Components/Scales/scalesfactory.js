/**
	Scale factory. Separation is provived in an intent
	to provide an easy way to switching scales in a defined chart

	@class ScaleFactory
	@constructor
	@requires d3,
            ordinalscale,
            linearscale,
            d3.chart

	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
    	'ordinalscale',
    	'linearscale',
    	'd3.chart'],
    	function(d3, OrdinalScale, LinearScale) {
	      // Export global even in AMD case in case this script is loaded with others
	      return factory(d3, OrdinalScale, LinearScale);
    });
  }
  else {
    // Browser globals
    return factory(d3, OrdinalScale, LinearScale);
  }
}(this, function(d3, OrdinalScale, LinearScale) {
	var ScaleFactory = function(){

	};

	/**
	Returns a specified scale object, acording to a scale type

	@method
	@param {String} scaleType Available scale type
	@param {String} axisType Related axis type ('x'-'y')
	@return {Object} d3.scale
	*/
	ScaleFactory.prototype.scale = function(scaleType, axisType){
		var scale;

		switch(scaleType){
			case 'ordinal' :
				scale = new OrdinalScale(axisType);
				break;
			case 'linear' :
				scale = new LinearScale(axisType);
				break;
		}
		return scale;
	}

	return ScaleFactory;
})
);