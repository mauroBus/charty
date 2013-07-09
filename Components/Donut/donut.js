/**
Donut drawer

@class Donut
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataInput').extend("Donut", {
  /**
  Donut initialization

  @method
  */
  initialize : function(){

    var pathBase = this.base.append('g');

    var pieLayout = d3.layout.pie().sort(null);
    var colorGen = d3.scale.category20();
    var arcGen = d3.svg.arc();

    this.layer('paths', pathBase ,{
      /**
      Data bind for donut.
      Will take y elements as data for drawing
      or : outter radius
      ir : inner radius

      @method
      @param {Object} data example = {
                                        ir : -150,
                                        or : -100,
                                        data : [...]
                                      }
      */
      dataBind : function(data){

        var chart = this.chart();
        chart.ir = data.ir;
        chart.or = data.or; 

        arcGen = arcGen.innerRadius(chart.ir)
                       .outerRadius(chart.or);

        var d1 = data.data.map(function(d){return d.y});

        return this.selectAll('path').data(pieLayout(d1));
      },
      /**
      Adds a path element for the donut
      
      @method
      */
      insert : function(){
        return this.append('path');
      },
      events : {
        'exit' : function(){
          return this.remove();
        },
        'merge' : function(){

          var chart = this.chart();

          console.log(chart.w);

          return this.attr('transform', "translate(" + chart.w / 2 + "," + chart.h / 2 + ")")
                     .attr("fill", function(d, i) {
                          return colorGen(i);})
                     .attr("d", arcGen);
        }
      }
    });
  },
  /**
  Sets the radius for donut paths.

  @method
  @param {Number} newRadius
  @chainable
  */
  radius : function(newRadius){
    if(arguments.length === 0){
      return this.r;
    }
    this.r = newRadius;
    return this;
  }
});