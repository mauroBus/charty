/**
Grouped bar chart.
Unlike regular bar char, grouped needs to define
two scales for x axis : one for the axis itself, and
another one for the data mapping.

@class GroupedBarChart
@extends MultipleDataGroup
@requires d3.chart,
          charty/chartynames,
          charty/scalesfactory,
          charty/bar,
          charty/xyaxis,
          charty/multipledatagroup,
          charty/multipleinstancesmixin
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/groupedbarchart', [
            'd3.chart',
            'charty/scalesfactory',
            'charty/chartynames',
            'charty/bar',
            'charty/xyaxis',
            'charty/multipledatagroup',
            'charty/multipleinstancesmixin',
           ],
           function(d3, ScaleFactory, Charty) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(d3, ScaleFactory, Charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, ScaleFactory, Charty);
  }
}(this, function(d3, ScaleFactory, Charty) {
  d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.GROUPED_BAR_CHART, {
    /**
    Grouper Bar Chart initializer.

    @method
    */
    initialize : function(args){

      var options = {
        chartName : Charty.CHART_NAMES.BAR,
        instances : (args.instances || 1)
      };

      var bars = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'), options),
          axis = this.mixin(args.axisSystem, this.base.append('g'), args).showAsGrid(args.showAsGrid);

      this.scaleFactory = args.scaleFactory;

      this.setMixins(bars, axis);
    },
    /**
    It is necessary to rewrite transform data, in order to
    generate a new scale.

    Two scales are needed : one for the axis, and another
    one for bar drawing.

    @method
    @param {Object} data Data Accessor
    */
    transform : function(data){

      var d = data.first();
      console.log(d);

    }
  });
}));