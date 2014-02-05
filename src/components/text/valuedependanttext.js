/**
* Text labeling above the data element for positive elements,
* and below for negative ones. Redefindes "merge"
* Useful for vertical bar chart
*
* @class ValueDependantText
* @extends Text
* @requires d3.chart,
*           charty,
*           text
*
* @author "Cesar Del Soldato <cesar.delsoldato@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/valuedependanttext',[
      'd3.chart',
      'charty/chartynames',
      'charty/text'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.TEXT)
    .extend(Charty.CHART_NAMES.VALUE_DEPENDANT_TEXT, {
    /**
    * @constructor
    * @param {Object} args Arguments for above text component.
    */
    initialize : function(args){

      var textLayer = this.layer('texts');

        /**
       * Sets offset for label.
       */
      var labelOffset = 0;

      textLayer.off('merge');
      textLayer.on('merge', function () {

        var chart = this.chart(),
          zeroY = chart.yscale.map(0),
          heightZeroY = chart.h - zeroY;

        this.attr('x', function (d){
          var pos = 0;
          if (chart.zScale){
            pos += chart.zScale.map(d.z, 1);
          }

          return (pos += chart.xscale.map(d.x, (chart.factor || 1))+(chart.xscale.band(chart.factor || 1)/2));
        }).attr('y', function (d){
          var yScaleMap = chart.yscale.map(d.y, chart.factor),
            yPos = Math.min(zeroY, yScaleMap) + labelOffset -7;
          labelOffset = labelOffset + yScaleMap - zeroY;

          if (d.y < 0) {
            yPos = yPos + 14 + Math.abs(chart.yscale.band(chart.h,d.y) - heightZeroY);
          }

          return yPos;
        }).text(function (d){
          return d.y;
        });
      });
    }
  });
}));