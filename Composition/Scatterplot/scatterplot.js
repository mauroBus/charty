/**
Scatterplot chart

@class Scatterplot
@extends MultipleDataGroup
@constructor
@requires d3,
          d3.chart,
          circle,
          multipledatagroup,
          yxyaxis,
          multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
    	'd3.chart',
    	'circle',
    	'multipledatagroup',
    	'yxyaxis',
    	'multipleinstancesmixin'],
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
	d3.chart('MultipleDataGroup').extend('Scatterplot',{
		initialize : function(args){
			var options = {
				chartName : 'Circle',
				instances : (args.instances || 1)
			}

			var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();
			var lineChart = this.mixin('MultipleInstancesMixin', this.base, options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
 })
);