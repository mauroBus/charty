/**
Rounded rectangle drawer.

@class RoundedRectangle
@constructor
@extends SimpleDataInput

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataInput').extend('RoundedRectangle',{
  initialize : function(){

    var pathBase = this.base.append('g');

    this.layer('roundedrects', pathBase,{
      /**
      Data bind for Rounded Rectangle.
      Data defines a rectangle height (rh), width (rw),
      color (rc).

      @method
      @param {Object} d example = {
                                    rh : 20,
                                    rw : 20,
                                    rc : 'red'
                                    data : [...]
                                  }
      */
      dataBind : function(d){

        var chart = this.chart();

        chart.rh = d.rh;
        chart.rw = d.rw;
        chart.rc = d.rc;

        return this.selectAll('rect').data(d.data);
      },
      insert : function(){
        return this.append('rect');
      },
      events : {
        'enter' : function(){

          var chart = this.chart();

          return this.attr('height',chart.rh)
                     .attr('width',chart.rw)
                     .attr('x', function(d){
                        var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                        return val;
                      })
                     .attr('y',function(d){
                        return chart.yscale.map(d.y)-(chart.rh/2);
                      })
                     .attr('rx', 5)
                     .attr('ry', 5)
                     .attr('fill',function(d){
                        if(d.c){
                          return d.c;
                        }
                        return chart.rc;
                     });
        },
        update : function(){

          var chart = this.chart();

          return this.attr('height',chart.rh)
                     .attr('width',chart.rw)
                     .attr('x', function(d){
                        var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                        return val;
                      })
                     .attr('y',function(d){
                        return chart.yscale.map(d.y);
                      })
                     .attr('rx', 5)
                     .attr('ry', 5)
                     .attr('fill',function(d){
                        if(d.c){
                          return d.c
                        }
                        return chart.rc;
                     });
        },
        'exit' : function(){
          return this.remove();
        }
      }
    })
  }
});