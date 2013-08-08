/**
Chart that can represent many data series

@class MultipleInstancesMixin
@extends BaseChart
@constructor
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('multipleinstancesmixin',[
      'd3.chart',
      'charty',
      'basechart'
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

  d3.chart(charty.CHART_NAMES.BASE_CHART)
    .extend(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, {
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
        instance.factor = ((f--)/options.instances);
        this.componentsMixins.push(instance);
      }
    }
  });
}));