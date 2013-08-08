/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          line,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('linechart',[
      'd3.chart',
      'charty',
      'line',
      'multipledatagroup'
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
    .extend(charty.CHART_NAMES.LINE_CHART,{
		/**
		Multiple data group initializator.

		Creates N instances of a given mixin.

		@method
		@param {Object} args N = args.instances
		*/
		initialize : function(args){
			var options = {
				chartName : charty.CHART_NAMES.LINE,
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS, this.base.append('g')).showAsGrid(),
					lineChart = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
}));