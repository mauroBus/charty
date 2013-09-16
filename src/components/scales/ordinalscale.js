/**
Ordinal Scale

@class OrdinalScale
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
    define('charty/ordinalscale',[
			'd3.chart',
			'charty/basescale',
			],
			function (d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    window.OrdinalScale = factory(d3, BaseScale);
  }
}(this, function (d3, BaseScale) {

	var OrdinalScale = function(axisType){
		this.scale = d3.scale.ordinal();
		this.axisType = axisType;
	};

	/**
	Inheritance from BaseScale
	*/
	OrdinalScale.prototype = new BaseScale();

	/**
	Sets the domain data for the scale

	@param {Array} domain values for ordinal domain
	@method
	@chainable
	*/
	OrdinalScale.prototype.setDomain = function(domain){
		this.scale = this.scale.domain(domain);
		return this;
	};

	/**
	Sets the range for the scale

	@param {Number} range numeric value for the range
	@method
	@chainable
	*/
	OrdinalScale.prototype.setRange = function(range){
		this.scale = this.scale.rangeRoundBands(this.generateRange(range) , .1);
		return this;
	};

	/**
	Maps a value to the current scaling
	Since ordinal scales computes a band width
	A value needs to be mapped and moved according
	to that band width

	@method
	@param {String} value String value that belongs to the domain
	@param {Number} factor reduce factor for overlapping charts
	@return {Number} mapped String value
	*/
	OrdinalScale.prototype.map = function(value, factor){
		return (this.scale(value) + ((this.scale.rangeBand() - (this.scale.rangeBand() * factor))/2));
	};

	/**
	Returns the range band for the scale
	Can be reduced if (factor < 1)

	@method
	@param {Number} factor reduce factor
	@return {Number} scale width
	*/
	OrdinalScale.prototype.band = function(factor){
		return (this.scale.rangeBand() * factor);
	};

	/**
	Calculates the scale domain, based on a data collection and a
	callback function
	Regarding the data series, ordinal scales should be uniform, whether
	they have values for that specific ordinal element or not.

	@method
	@param {Object} data Accessor for the data collection
	@param {Object} f callback function
	@chainable
	*/
	OrdinalScale.prototype.calculateDomain = function(data, f){
		var dataSample = data.first().data,
				dom = dataSample.map(f);

		return this.setDomain(dom);
	};

	/**
	Checks if domain wasn't previously calculated

	@method
	@return {Boolean} True if domain isn't set
	*/
	OrdinalScale.prototype.defaultDomain = function(){
		return (this.scale.domain().length === 0);
	};

	return OrdinalScale;
}));