/**
Linear scale for linear axis

@class LinearScale
@constructor
@extends BaseScale
@requires d3.chart,
					basescale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/linearscale',[
			'd3.chart',
			'charty/basescale'
			],
			function (d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    window.LinearScale = factory(d3, BaseScale);
  }
}(this, function (d3, BaseScale) {

	var LinearScale = function(axisType){
		this.scale = d3.scale.linear();
		this.axisType = axisType;
	};

	/**
	Inheritance from BaseScale
	*/
	LinearScale.prototype = new BaseScale();

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
	};

	/**
	Sets the range for the linear scale

	@method
	@param {Number} range numeric value for linear scale
	@chainable
	*/
	LinearScale.prototype.setRange = function(range){

		this.scale = this.scale.range(this.generateRange(range));
		return this;
	};

	/**
	Returns scaled value

	@method
	@param {Number} value number to map to scale
	@return {Number} mapped value
	*/
	LinearScale.prototype.map = function(value){
		return this.scale(value);
	};

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
	};

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
		var max = -Infinity,
				min = Infinity;
				d = data.getData();

				d.forEach(function(element){
					var d = element.data,
							maxg = d3.max(d, f),
							ming = d3.min(d, f);

					max = Math.max(maxg, max);
					min = Math.min(ming, min);
			});

			return this.setDomain(Math.min(0, min), Math.max(0, max));
	};

	return LinearScale;
}));