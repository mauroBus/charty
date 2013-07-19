/**
Linear scale for linear axis

@class LinearScale
@constructor
@requires d3,
		  d3.chart

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
	var LinearScale = function(axisType){
		this.scale = d3.scale.linear();
		this.axisType = axisType;
	}

	/**
	Sets domain for linear scale

	@method
	@param {Number} minValue minimum value for scale
	@param {Number} maxValue maximum value for scale
	@chainable
	*/
	LinearScale.prototype.setDomain = function(minValue, maxValue){
		this.scale = this.scale.domain([minValue, maxValue]);
			return this;
	}

	/**
	Sets the range for the linear scale

	@method
	@param {Number} range numeric value for linear scale
	@chainable
	*/
	LinearScale.prototype.setRange = function(range){
		var r;

		if(this.axisType === 'x'){
			r = [0,range];
		}
		else{
			if(this.axisType === 'y'){
				r = [range, 0];
			}
			else{
				throw new Error('No axis type was defined for this linear scale');
			}
		}

		this.scale = this.scale.range(r);
		return this;
	}

	/**
	Returns the created linear scale

	@method
	@return {Object} d3.scale (linear scale)
	*/
	LinearScale.prototype.getScale = function(){
		return this.scale;
	}

	/**
	Returns scaled value

	@method
	@param {Number} value number to map to scale
	@return {Number} mapped value
	*/
	LinearScale.prototype.map = function(value){
		return this.scale(value);
	}

	/**
	Returns band for a specified value

	@method
	@param {Number} max max value for a scale
	@param {Number} value to map
	@return {Number} similar to ordinal band but for
	linear scale
	*/
	LinearScale.prototype.band = function(max, value){
		return (max - this.scale(value));
	}

	/**
	Calculates the domain for the linear scale

	Data probably won't be uniform, so for each data element,
	a maximum value is obtained. The maximum element will be kept.
	Same situation is for the minimum element

	Keeps a reference for the minimum value

	@method
	@param {Object} data Accessor for the data collection
	@param {Object} f callback function
	@chainable
	*/
	LinearScale.prototype.calculateDomain = function(data, f){
		var max = -100000,
			min = 1000000;

		var d = data.getData();	

	  	d.forEach(function(element){
		    var d = element.data;
		    var maxg = d3.max(d, f);
		    var ming = d3.min(d, f);
		    if(maxg > max){
		      max = maxg;
		    }
		    if(ming < min){
				min = ming;
		  	}
		});

	  	this.min = min;

	  	return this.setDomain(Math.min(0, min), Math.max(0,max));
	};

	return LinearScale;
})
);