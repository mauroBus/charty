/**
Defines common scale functionality. Used as base element
for inheritance.

@class BaseScale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define(['d3',
      'd3.chart'],
      function(d3) {
        /** Export global even in AMD case in case this script 
        is loaded with others */
        return factory(d3);
    });
  }
  else {
    /** Browser globals */
    return factory(d3);
  }
}(this, function(d3) {

	var BaseScale = function(){

	}

	/**
	Returns the created scale

	@method
	@return {Object} d3.scale Linear / Ordinal scale
	*/
	BaseScale.prototype.getScale = function(){
		return this.scale;
	}

	/**
	Generates range value for a scale. 

	@method
	@param {Number} range value for the range
	@return {Number} generated range value
	*/
	BaseScale.prototype.generateRange = function(range){
		var r ;

		if(this.axisType === 'x'){
			r = [0,range];
		}
		else{
			if(this.axisType === 'y'){
				r = [range,0]
			}
			else{
				throw new Error('No scale was defined for this scale.');
			}
		}

		return r; 
	}

	return BaseScale; 

}));