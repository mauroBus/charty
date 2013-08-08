/**
Defines common scale functionality. Used as base element
for inheritance.

@class BaseScale
@requires d3.chart,
          charty

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('basescale',[
      'd3.chart',
      'charty'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

	var BaseScale = function(){

	};

	/**
	Returns the created scale

	@method
	@return {Object} d3.scale Linear / Ordinal scale
	*/
	BaseScale.prototype.getScale = function(){
		return this.scale;
	};

	/**
	Generates range value for a scale.

	@method
	@param {Number} range value for the range
	@return {Number} generated range value
	*/
	BaseScale.prototype.generateRange = function(range){
		var r ;

		if(this.axisType === charty.AXIS.X){
			r = [0,range];
		}
		else{
			if(this.axisType === charty.AXIS.Y){
				r = [range,0];
			}
			else{
				throw new Error('No scale was defined for this scale.');
			}
		}

		return r;
	};

	return BaseScale;
}));