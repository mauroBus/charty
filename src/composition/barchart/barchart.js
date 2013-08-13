/**
Create a bar chart that will render
N data series

@class BarChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          bar,
          multipledatagroup,
          yxyaxis,
          multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/barchart',[
      'd3.chart',
      'charty/chartynames',
      'charty/bar',
      'charty/multipledatagroup',
      'charty/xyaxis',
      'charty/yxyaxis',
      'charty/multipleinstancesmixin',
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
    .extend(Charty.CHART_NAMES.BAR_CHART,{
		/**
		BarChart initialization.

		@method
		@param {Object} args example = {
                          instances : 2,
                        }
		*/
		initialize : function(args){

			var options = {
				chartName : Charty.CHART_NAMES.BAR,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var axis = this.mixin(args.axisSystem,
                           this.base.append('g'),
                           { dataValidator : args.dataValidator }).showAsGrid(),

					barChart = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                this.base.append('g'),
                                options);

			this.componentsMixins = [];
			this.componentsMixins.push(barChart);
			this.componentsMixins.push(axis);
		}
	});
}));