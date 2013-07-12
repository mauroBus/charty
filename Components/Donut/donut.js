/**
Donut drawer

@class Donut
@extends SimpleDataGroup
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataGroup').extend("Donut", {
  /**
  Donut initialization

  @method
  */
  initialize : function(){

    var pathBase = this.base.append('g');

    var pieLayout = d3.layout
                      .pie()
                      .sort(null)
                      .value(function(d){
                        return d.x;
                      });

    var arcGen = d3.svg.arc();

    this.layer('paths', pathBase ,{
      /**
      Data bind for donut.
      Will take x elements as data for drawing
      or : outter radius
      ir : inner radius
      Each part of the donut must have a color set

      @method
      @param {Object} data example = {
                                        ir : -150,
                                        or : -100,
                                        data : [
                                          {x : 200, c: 'red' }
                                          {x : 500, c: 'blue'}
                                        ]
                                      }
      */
      dataBind : function(data){

        var chart = this.chart();
        chart.ir = data.ir;
        chart.or = data.or;

        arcGen = arcGen.innerRadius(chart.ir)
                       .outerRadius(chart.or);

        return this.selectAll('path').data(pieLayout(data.data));
      },
      /**
      Adds a path element for the donut

      @method
      */
      insert : function(){
        return this.append('path');
      },
      events : {
        'enter' : function(){

          var chart = this.chart();

          return this.attr('transform', "translate(" + chart.w / 2 + "," + chart.h / 2 + ")")
                     .attr("fill", function(d) {
                          return d.data.c;
                      })
                     .attr("d", arcGen);
        },
        'update' : function(){
          var chart = this.chart();
          return this.attr("fill", function(d) {
                          return d.data.c;
                      })
                     .attr("d", arcGen);
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });
  }
});