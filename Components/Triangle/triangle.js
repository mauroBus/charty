/**
Triangle drawer.

@class Triangle
@constructor
@extends SimpleDataGroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('SimpleDataGroup').extend('Triangle',{
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

        return this.selectAll('path').data(d);

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
  Triangle drawer IS SimpleDataInput
  However, transform must be redefined in order to 
  separate a triangle in two constituting parts

  @method
  @param {Object} data Data Acccessor
  @return {Object} already mapped values for each datapoint
  */
  transform : function(data){
    var result = [];

    var dataArray = data.next().data;

    for(var i = 0; i < dataArray.length; i++){
      var element = dataArray[i]; 

      var x1 = this.xscale.map(element.x,1);
      var x2 = x1 + this.xscale.band(1)/2; 
      var x3 = x1 + this.xscale.band(1); 

      var y1 = this.yscale.map(0);
      var y2 = this.yscale.map(element.y);

      result.unshift({x1 : x1, y1: y1, x2 : x2, y2 : y2, x3 : x2, y3 : y1, c: element.c1});
      result.unshift({x1 : x2, y1: y1, x2 : x2, y2 : y2, x3 : x3, y3 : y1, c: element.c2}); 

    }
    return result; 
  },
  /**
  Path is defined as a string connecting different
  data, visualized as dots.

  @method
  @param {Object} d
  @return {String} path
  */
  getPath : function(d){
    var p = 'M '+d.x1+' '+d.y1+' L '+d.x2+' '+d.y2+' L '+d.x3+' '+d.y3;
    return p;
  }
});