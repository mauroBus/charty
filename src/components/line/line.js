/**
Line drawing.

@class Line
@extends SimpleDataGroup
@constructor
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('line',[
      'd3.chart',
      'charty',
      'simpledatagroup'
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
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LINE, {
    /**
    Line initialization

    @method
    */
    initialize : function(){

      /**
      c : default color line
      */
      var defaults = {
        c : 'line-default'
      };

      var line = d3.svg.line();

      var options = {
        /**
        Data bind for a line serie.
        Since a line is drawed using d3.line
        a datum must be defined. Can also have a color
        for the whole serie.

        @method
        @param {Object} d example = {
                                      color : 'redline'
                                      data : [
                                        {x : 'Jan', y: 200},
                                        ...
                                      ]
                                    }
        */
        dataBind : function(d){

          var chart = this.chart();

          line.x(function(d) {
            return chart.xscale.map(d.x, 0);
          }).y(function(d) {
            return chart.yscale.map(d.y, 0);
          });

          chart.datum = d.data;
          chart.c = (d.color || defaults.c);

          return this.selectAll('path').data([0]);

        },
        /**
        Appends a svg:path

        @method
        @chainable
        */
        insert : function(){

          return this.append('path');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              return this.datum(chart.datum)
                         .attr('class', chart.c)
                         .attr('d',line);
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('lineslayer', this.base.append('g'), options);
    }
  });
}));