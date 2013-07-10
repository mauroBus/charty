/**
Triangle drawer.

@class Triangle
@constructor
@extends SimpleDataInput

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataInput').extend('Triangle',{
  /**
  Triangle initialization

  @method
  */
  initialize : function(){

    var pathBase = this.base.append('g');

    this.layer('triangles', pathBase , {
      /**
      Data bind for a triangle serie.
      Will set a color for the whole serie.

      @method
      @param {Object} d example = {
                                    color : 'red',
                                    data : [...]
                                  }
      */
      dataBind : function(d){

        var chart = this.chart();
        chart.c = d.color;

        return this.selectAll('path').data(d.data);

      },
      insert : function(){
        return this.insert('path');
      },
      events : {
        'enter' : function(){

          var chart = this.chart();

          return this.attr('class', function(d){
                        if(d.c){
                          return d.c;
                        }
                        return chart.c;
                      })
                     .attr('d', function(d){
                        return chart.getPath(d);
                      });
        },
        'update' : function(){
          var chart = this.chart();

          return this.attr('class', function(d){
                        if(d.c){
                          return d.c;
                        }
                        return chart.c;
                      })
                     .attr('d', function(d){
                        return chart.getPath(d);
                      });
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });
  },
  /**
      Path is defined as a string connecting different
      data, visualized as dots.

      @method
      @param {Object} d
      @return {String} path
      */
      getPath : function(d){
        var p = "M ";

        var x1 = this.xscale.map(d.x,1);
        var y1 = this.yscale.map(0);

        p = p + x1 + " " + y1+" ";

        var x2 = x1 + this.xscale.band(1)/2;
        var y2 = this.yscale.map(d.y);

        p = p + "L " + x2 + " " + y2 +" ";

        var x3 = x1 + this.xscale.band(1);
        var y3 = this.yscale.map(0);

        p = p + "L " + x3 + " " + y3;

        return p;
      },
});