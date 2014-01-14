/**
Scale factory. Separation is provived in an attempt
to provide an easy way to switching scales in a defined chart

@class ScaleFactory
@constructor
@requires d3.chart,
          charty,
          ordinalscale,
          linearscale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/scalesfactory',[
      'charty/chartynames',
      'charty/ordinalscale',
      'charty/linearscale',
      ],
      function(Charty, OrdinalScale, LinearScale) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(Charty, OrdinalScale, LinearScale);
    });
  }
  else {
    /** Browser globals */
    root.ScaleFactory = factory(Charty, OrdinalScale, LinearScale);
  }
}(this, function(Charty, OrdinalScale, LinearScale) {
	var ScaleFactory = function(){};

	/**
	Returns a specified scale object, acording to a scale type

	@method
	@param {String} scaleType Available scale type
	@param {String} axisType Related axis type ('x'-'y')
	@return {Object} LinearScale / OrdinalScale
	*/
	ScaleFactory.prototype.scale = function(scaleType, axisType){
		var scale;

		switch(scaleType){
			case Charty.AXIS_TYPE.ORDINAL :
				scale = new OrdinalScale(axisType);
				break;
			case Charty.AXIS_TYPE.LINEAR :
				scale = new LinearScale(axisType);
				break;
		}

		return scale;
	};

	return ScaleFactory;
}));