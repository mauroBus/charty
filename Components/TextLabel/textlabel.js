/**
Text labeling.

@class TextLabel
@extends SimpleDataInput
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataInput').extend('TextLabel', {
  /**
  Text label initializator

  @method
  */
  initialize : function(){

    var pathBase = this.base.append('g');

    this.layer('texts', pathBase ,{
      /**
      Data bind for text labeling.
      Can depend on other elements, for instance,
      the rounded rectangles to form a label.

      @method
      @param {Object} d example = {
                                    rh : 15,
                                    rw : 15,
                                    data : [...]
                                  }
      */
      dataBind : function(d){

        var chart = this.chart();
        chart.rh = d.rh;
        chart.rw = d.rw;

        return this.selectAll('text').data(d.data);
      },
      insert : function(){
        return this.append('text');
      },
      events : {
        'enter' : function(){

            var chart = this.chart();

            return this.attr('x', function(d){
                          var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2) ;
                          return val;
                        })
                       .attr('y', function(d){
                          return chart.yscale.map(d.y);
                        })
                       .attr("text-anchor", "middle")
                       .text(function(d) { return d.y; });
        },
        'update' : function(){

            var chart = this.chart();

             return this.attr('x', function(d){
                          var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2) ;
                          return val;
                        })
                       .attr('y', function(d){
                          return chart.yscale.map(d.y)+chart.rh;
                        })
                       .attr("text-anchor", "middle")
                       .text(function(d) { return d.y; });
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });

  }
})