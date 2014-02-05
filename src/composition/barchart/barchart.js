/**
* Create a bar chart that will render
* N data series
* 
* @class BarChart
* @extends MultipleDataGroup
* @requires d3.chart,
*           charty,
*           underscore,
*           bar,
*           multipledatagroup,
*           yxyaxis,
*           multipleinstancesmixin
* 
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/barchart',[
      'd3.chart',
      'charty/chartynames',
      'underscore',
      'charty/bar',
      'charty/horizontalbar',
      'charty/multipledatagroup',
      'charty/xyaxis',
      'charty/yxyaxis',
      'charty/multipleinstancesmixin',
      'charty/text',
      'charty/abovetext',
      'charty/righttext'
      ],
      function (d3, Charty, _) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(d3, Charty, _);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty, _);
  }
}(this, function (d3, Charty, _) {

	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.BAR_CHART,{
      
		/**
		* BarChart initialization.
    * 
		* @constructor
		* @param {Object} args example = {
    *                       instances : 2,
    *                       labelType : Charty.CHART_NAMES.ABOVE_TEXT
    *                    }
		*/
		initialize : function(args){

      args.instances = (args.instances || 1);
      args.chartName = args.barType;

			var axis = this.mixin(args.axisSystem,
                           this.base.append('g'),
                           args).showAsGrid(args.showAsGrid),

					barChart = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                this.base.append('g'),
                                args);

      /** Optional */
      if (args.labelType){

        textLabels = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                this.base.append('g'),
                                _.extend(args, { chartName : args.labelType }));
      }
		}
	});
}));