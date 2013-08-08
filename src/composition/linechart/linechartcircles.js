/**
Line chart combined with circles.

@class LineChartCircles
@constructor
@extends MultipleDataGroup
@requires	d3.chart,
          charty,
					multipledatagroup,
					linechart,
					multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('linechartcircles',[
      'd3.chart',
      'charty',
      'multipledatagroup',
      'linechart',
      'multipleinstancesmixin'
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
	d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LINE_CHART_CIRCLES,{
		/**
		Line and circles chart initializator.

		@method
		@param {Object} args example = {
                              instances : 2
                          }
		*/
		initialize : function(args){

			var options = {
				chartName : charty.CHART_NAMES.CIRCLE,
				instances : (args.instances || 1)
			};

			var lineChart = this.mixin(charty.CHART_NAMES.LINE_CHART, this.base.append('g'), options),
					circles = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(circles);
		}
	});
}));