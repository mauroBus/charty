/**
Bar drawer. Takes only one data series as input.

@class Bar
@constructor
@extends SimpleDataGroup
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'charty',
      'simpledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others*/
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.BAR, {
    /**
    Bar initialization

    @method
    */
    initialize : function(){

      /**
      Sets only bar color as default.
      */
      var defaults = {
        c : 'bar-default'
      };

      var options = {
        /**
        Data bind for a bar serie.
        Can have a color set for the whole serie, or
        each bar can have an own color defined.

        @method
        @param {Object} d example = {
                                       color : 'red',
                                       data = [
                                        {x : 'Jan', y : 200, c : 'blue'}
                                       ]
                                    }
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          /**
          Sets color for the whole data serie.
          */
          chart.c = (d.color || defaults.c);

          return this.selectAll('rect').data(d.data);
        },
        /**
        Inserts a svg:rect element.

        @method
        @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          'merge' : function(){

            var chart = this.chart(),
                zeroY = chart.yscale.map(0),
                heightZeroY = chart.h - zeroY;

            /**
            chart.factor : value used to define bar's width. It can
            be useful to reduce the width, in case many data series
            are draw using bars.
            */

            this.attr('class', function(d){
                  return (d.c || chart.c);
                })
                .attr('x', function(d) { return chart.xscale.map(d.x, chart.factor);} )
                .attr('width', chart.xscale.band(chart.factor))
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

      /**
      Layer creation
      */
      this.layer('barlayer', this.base ,options);

    }
  });
}));