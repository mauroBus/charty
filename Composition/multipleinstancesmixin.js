/**
Chart that can represent many data series

@class MultipleInstancesMixin
@extends BaseChart
@constructor
@requires d3.chart,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'basechart'
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
  d3.chart('BaseChart').extend('MultipleInstancesMixin', {
    /**
    Creates multiple mixin instances of a specific chart.
    It is necessary to set the instances count
    and the chart name.

    @method
    @param {Object} options example = {
                                        instances : 2,
                                        chartName : 'Bar'
                                      }
    */
    initialize : function(options){

      var f = options.instances;

      this.componentsMixins = [];

      for(var i = options.instances - 1; i >= 0; i--){
        var instance = this.mixin(options.chartName, this.base.append('g'));
        instance.factor = (f--/options.instances);
        this.componentsMixins.push(instance);
      }
    }
  });
})); 