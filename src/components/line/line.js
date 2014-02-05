/**
* Line drawing.
*
* Note : this charts doesn't take events, as it doesn't seem necessary for now.
*
* @class Line
* @extends SimpleDataGroup
* @requires d3.chart,
*           charty,
*           simpledatagroup
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/line',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
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
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LINE, {
    /**
    * Line initialization
    *
    * @constructor
    * @param {Object} args Arguments for the line component.
    */
    initialize : function(){

      /**
      * c : default color line
      */
      var defaults = {
        c : 'line-default'
      };

      var line = d3.svg.line();

      var options = {
        /**
        * Data bind for a line serie.
        * Since a line is drawed using d3.line
        * a datum must be defined. Can also have a color
        * for the whole serie.
        *
        * @method dataBind
        * @param {Object} d example = {
        *                              color : 'redline'
        *                              data : [
        *                                {x : 'Jan', y: 200},
        *                                ...
        *                              ]
        *                            }
        */
        dataBind : function(d){

          var chart = this.chart();

          line.x(function(d) { return chart.xscale.map(d.x, 0); })
              .y(function(d) { return chart.yscale.map(d.y, 0); });

          chart.datum = d.data;
          chart.c = (d.c || defaults.c);

          return this.selectAll('path').data([0]);

        },
        /**
        * Appends a svg:path
        *
        * @method insert
        * @chainable
        */
        insert : function(){

          return this.append('path');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              this.datum(chart.datum)
                  .classed(chart.c, true)
                  .attr('d',line);

              return this;
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      * Layer creation
      */
      this.layer('lineslayer', this.base.append('g'), options);
    }
  });
}));
