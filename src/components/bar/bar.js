/**
* Bar drawer. Takes only one data series as input.
* 
* @class Bar
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
    define('charty/bar',[
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
    .extend(Charty.CHART_NAMES.BAR, {
    /**
    * Bar initialization
    *
    * @method
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
        * @method
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
        * @method
        * @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          /** Events are set, drawing of new elements is handled by merger */
          'enter' : function (){
            this.chart().eventManager.bindAll(this);

            return this;
          },
          'merge' : function(){

            var chart = this.chart(),
                zeroY = chart.yscale.map(0),
                heightZeroY = chart.h - zeroY;

            /**
            * chart.factor : value used to define bar's width. It can
            * be useful to reduce the width, in case many data series
            * are draw using bars.
            */
            this.attr('class', function(d){
                  return (d.c || chart.c);
                })
                .attr('x', function(d) {
                  var pos = 0;
                  if (chart.zScale){
                    pos += chart.zScale.map(d.z, 1);
                  }
                  return (pos += chart.xscale.map(d.x, (chart.factor || 1) ));
                })
                .attr('width', chart.xscale.band(chart.factor || 1))
                .attr('y', function(d) {
                  return Math.min(zeroY, chart.yscale.map(d.y, chart.factor));
                })
                .attr('height', function(d) {
                  return Math.abs(chart.yscale.band(chart.h,d.y) - heightZeroY);}
                );

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

              var chart = this.chart(),
                zeroY = chart.yscale.map(0),
                heightZeroY = chart.h - zeroY;

              this.attr('x', function (d){
                var pos = 0;
                if (chart.zScale){
                  pos += chart.zScale.map(d.z, 1);
                }

                return (pos += chart.xscale.map(d.x, (chart.factor || 1))+(chart.xscale.band(chart.factor || 1)*0.45));
              }).attr('y', function (d){
                return Math.min(zeroY, chart.yscale.map(d.y, chart.factor));
              }).text(function (d){
                return d.y;
              });
          },
          'exit' : function (){
            return this.remove();
          }
        }
      };

      /**
      * Layer creation
      */
      this.layer('barlayer', this.base.append('g') , options);

      if (args.setTextLabels){
        this.layer('textlabels', this.base.append('g'), labelsOptions);
      }
    },
    /**
    * Adds z scale if necessary
    *
    * @method
    * @param {Object} zScale d3.scale
    * @chainable
    */
    setZScale : function (zScale){
      this.zScale = zScale;
      return this;
    }
  });
}));