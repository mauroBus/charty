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
    define('charty/linechartcircles',[
      'd3.chart',
      'charty/chartynames',
      'charty/multipledatagroup',
      'charty/linechart',
      'charty/multipleinstancesmixin'
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
	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LINE_CHART_CIRCLES,{
		/**
		Line and circles chart initializator.

		@method
		@param {Object} args example = {
                              instances : 2
                          }
		*/
		initialize : function(args){

			var options = {
				chartName : Charty.CHART_NAMES.CIRCLE,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var lineChart = this.mixin(Charty.CHART_NAMES.LINE_CHART,
                                this.base.append('g'),
                                options),

					circles = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                              this.base.append('g'),
                              options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(circles);
		}
	});
}));