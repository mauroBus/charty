/**
* Bar drawer. Takes only one data series as input.
* Extends Bar component, since only merge will be redefined.
*
* @class HorizontalBar
* @constructor
* @extends Bar
* @requires d3.chart,
*           charty,
*           bar
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/horizontalbar',[
      'd3.chart',
      'charty/chartynames',
      'charty/bar'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        * is loaded with others*/
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory (d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.BAR)
    .extend(Charty.CHART_NAMES.HORIZONTAL_BAR, {
    /**
    * Horizontal bars initialization
    *
    * @constructor
    * @param {Object} [args] Arguments for horizontal bar component.
    */
    initialize : function(){

      var barLayer =  this.layer('barlayer');

      /** Necessary for the way d3.chart handles events */
      barLayer.off('merge');
      barLayer.on('merge', function (){

        var chart = this.chart(),
            zeroX = chart.xscale.map(0);

        this.attr('class', function(d){
          return (d.c || chart.c);
        }).attr("x", function(d) {
          return chart.xscale.map(Math.min(0, d.x), chart.factor);
        })
        .attr("y", function(d) {
          return chart.yscale.map(d.y, chart.factor);
        })
        .attr("width", function(d) {
          return Math.abs(chart.xscale.map(d.x) - zeroX);
        })
        .attr("height", chart.yscale.band(chart.factor));

        return this;
      });
    }
  });
}));
