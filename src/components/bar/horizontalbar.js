/**
* Bar drawer. Takes only one data series as input.
* 
* @class HorizontalBar
* @constructor
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
    define('charty/horizontalbar',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
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
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.HORIZONTAL_BAR, {
    /**
    * Bar initialization
    *
    * @constructor
    * @param {Object} args Arguments for horizontal bar component.
    */
    initialize : function(args){

      /**
      * Sets only bar color as default.
      */
      var defaults = {
        c : 'bar-default'
      };

      var options = {
        /**
        * Data bind for a bar serie.
        * Can have a color set for the whole serie, or
        * each bar can have an own color defined.
        *
        * @method dataBind
        * @param {Object} d example = {
        *                               color : 'red',
        *                               data = [
        *                                {x : 'Jan', y : 200, c : 'blue'}
        *                               ]
        *                            }
        * @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          /**
          * Sets color for the whole data serie.
          */
          chart.c = (d.c || defaults.c);

          return this.selectAll('rect').data(d.data);
        },
        /**
        * Inserts a svg:rect element.
        *
        * @method insert
        * @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          /** Events are set, drawing of new elements is handled by merge */
          'enter' : function (){
            this.chart().eventManager.bindAll(this);

            return this;
          },
          'merge' : function(){

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

            chart.eventManager.bindAll(this);

            return this;
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      var labelsOptions = {
        dataBind : function (d){
          return this.selectAll('text').data(d.data);
        },
        insert : function (){
          return this.append('text');
        },
        events : {
          'merge' : function (){

              var chart = this.chart();

              this.attr('x', function (d){
                return chart.xscale.map(d.x, chart.factor);
              }).attr('y', function (d){
                return chart.yscale.map(d.y, chart.factor) + chart.yscale.band(chart.factor)/2;
              }).text(function (d){
                return d.x;
              });

              return this;
          },
          'exit' : function (){
            return this.remove();
          }
        }
      };

      /**
      * Layer creation
      */
      this.layer('horizontalayer', this.base.append('g') ,options);

      if (args.setTextLabels){
        this.layer('textlabels', this.base.append('g'), labelsOptions);
      }
    }
  });
}));