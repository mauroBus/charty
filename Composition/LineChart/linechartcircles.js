/**
Line chart combined with circles.

@class LineChartCircles
@constructor
@extends MultipleDataGroup
@requires	d3,
					d3.chart,
					multipledatagroup,
					linechart,
					multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define(['d3',
    	'd3.chart',
    	'multipledatagroup',
    	'linechart',
    	'multipleinstancesmixin'],
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
	d3.chart('MultipleDataGroup').extend('LineChartCircles',{
		/**
		Line and circles chart initializator.

		@method
		@param {Object} args example = {
												 		instances : 2
												 }
		*/
		initialize : function(args){

			var options = {
				chartName : 'Circle',
				instances : (args.instances || 1)
			};

			var lineChart = this.mixin('LineChart', this.base.append('g'), options);
			var circles = this.mixin('MultipleInstancesMixin', this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(circles);
		}
	});
}))