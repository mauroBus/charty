/**
Scatterplot chart

@class Scatterplot
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          circle,
          multipledatagroup,
          yxyaxis,
          multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('scatterplot',[
      'd3.chart',
      'charty',
      'circle',
      'multipledatagroup',
      'yxyaxis',
      'multipleinstancesmixin'
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
    .extend(Charty.CHART_NAMES.SCATTERPLOT, {

		initialize : function(args){
			var options = {
				chartName : Charty.CHART_NAMES.CIRCLE,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin(Charty.CHART_NAMES.YXY_AXIS,
                    this.base.append('g'),
                    { dataValidator : args.dataValidator }).showAsGrid(),

          lineChart = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                 this.base,
                                 options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
}));