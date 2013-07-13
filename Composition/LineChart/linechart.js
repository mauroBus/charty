/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
    	'd3.chart',
    	'line',
    	'multipledatagroup'], 
    	function(d3) {
	      // Export global even in AMD case in case this script is loaded with others
	      return factory(d3);
    });
  }
  else {
    // Browser globals
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
				instances : args.instances
			}

			var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();
			var lineChart = this.mixin('MultipleInstancesMixin', this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
 })
)