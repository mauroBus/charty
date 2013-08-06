/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          line,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'line',
      'multipledatagroup'
      ],
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
	d3.chart('MultipleDataGroup').extend('LineChart',{
		/**
		Multiple data group initializator.

		Creates N instances of a given mixin.

		@method
		@param {Object} args N = args.instances
		*/
		initialize : function(args){
			var options = {
				chartName : 'Line',
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid(),
					lineChart = this.mixin('MultipleInstancesMixin', this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
}));