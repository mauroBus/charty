/**
Circle drawer.

@class Circle
@extends SimpleDataGroup
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataGroup').extend('Circle',{

  /**
  Circle initializator

  @method
  */
  initialize : function(){

    this.pathBase = this.base.append('g');

    this.layer('circles', this.pathBase,{
      /**
      Data bind for a circle serie. 
      Can have color and circle radius set for the whole serie.

      @method
      @param {Object} d example = {
                                    color : 'red',
                                    r : 5
                                    data : [...]
                                  }
      */
      dataBind: function(d){

        var chart = this.chart();

        chart.c = d.color;
        chart.r = d.r; 

        return this.selectAll('circle').data(d.data);
      },
      insert : function(){
        return this.append('circle');
      },
      events : {
        'enter' : function(){

          var chart = this.chart();

          return this.attr('class',function(d){
                      if(d.c){
                        return d.c;
                      }
                      return chart.c; 
                    })
                    .attr("r", function(d){
                      if(d.r){
                        return d.r;
                      }
                      return chart.r;
                    })
                    .attr("cx", function(d) { return chart.xscale.map(d.x,0); })
                    .attr("cy", function(d) { return chart.yscale.map(d.y,0); });
        },
        'update' : function(){

          var chart = this.chart();

          return this.attr('class',function(d){
                      if(d.c){
                        return d.c;
                      }
                      return chart.c; 
                    })
                    .attr("r", function(d){
                      if(d.r){
                        return d.r;
                      }
                      return chart.r;
                    })
                    .attr("cx", function(d) { return chart.xscale.map(d.x,0); })
                    .attr("cy", function(d) { return chart.yscale.map(d.y,0); });
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });
  }
});