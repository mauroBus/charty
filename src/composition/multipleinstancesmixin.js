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
    define('charty/multipleinstancesmixin',[
      'd3.chart',
      'charty/chartynames',
      'charty/basechart'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.BASE_CHART)
    .extend(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, {
    /**
    Creates multiple mixin instances of a specific chart.
    It is necessary to set the instances count
    and the chart name.

    @method
    @param {Object} args example = {
                                        instances : 2,
                                        chartName : 'Bar'
                                      }
    */
    initialize : function(args){

      var f = args.instances;

      this.componentsMixins = [];

      for(var i = args.instances - 1; i >= 0; i--){

        var instance = this.mixin(args.chartName,
                                  this.base.append('g'),
                                  args);

        instance.factor = ((f--)/args.instances);
        this.componentsMixins.push(instance);
      }
    }
  });
}));