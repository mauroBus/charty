/**
Line drawing.

@class Line
@extends SimpleDataGroup
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataGroup').extend('Line', {
  /**
  Line initialization

  @method
  */
  initialize : function(){

    var line = d3.svg.line();

    var pathBase = this.base;

    this.layer('lineslayer', pathBase, {
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
        chart.c = d.color;

        return this.selectAll('path').data([0]);

      },
      insert : function(){
        return this.append('path');
      },
      events : {
        'enter' : function(){

            var chart = this.chart();

            return this.datum(chart.datum)
                       .attr('class',chart.c)
                       .attr('d',line);
        },
        'update':function(){

          var chart = this.chart();

          return this.datum(chart.datum)
                     .attr('class',chart.c)
                     .attr('d',line);
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });
  }
});