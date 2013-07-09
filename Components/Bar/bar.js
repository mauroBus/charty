/**
Bar drawer. Takes only one data series as input.

@class Bar
@constructor
@extends SimpleDataInput

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataInput').extend('Bar', {
  /**
  Bar initialization

  @method
  */
  initialize : function(){

    var pathBase = this.base;

    var options = {
      /**
      Data bind for a bar serie. 
      Can have a color set for the whole serie.

      @method
      @param {Object} d example = {
                                     color : 'red',
                                     daata = [...]
                                  }
      */
      dataBind : function(d){

        var chart = this.chart();

        chart.c = d.color;

        return this.selectAll('rect').data(d.data);
      },
      insert : function(){
        return this.append('rect');
      },
      events : {
        'enter' : function(){

              var chart = this.chart();

              this.attr("class", chart.c)
                  .attr("x", function(d) { return chart.xscale.map(d.x, chart.factor) })
                  .attr("width", chart.xscale.band(chart.factor))
                  .attr("y", function(d) { return chart.yscale.map(d.y, chart.factor)})
                  .attr("height", function(d) { return chart.yscale.band(chart.h,d.y) });
              return this;
        },
        'update' : function(){

              var chart = this.chart();

              this.attr("class", chart.c)
                  .attr("x", function(d) { return chart.xscale.map(d.x, chart.factor) })
                  .attr("width", chart.xscale.band(chart.factor))
                  .attr("y", function(d) { return chart.yscale.map(d.y, chart.factor)})
                  .attr("height", function(d) { return chart.yscale.band(chart.h,d.y) });
              return this;
        },
        'exit' : function(){
          return this.remove();
        }
      }
    };

    //Layer creation
    this.layer('barlayer', pathBase.append('g') ,options);

  }
});