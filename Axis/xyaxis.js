/**
Base XY system for all the 2D charts.

@class XYAxis
@constructor
@extends GenericChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('GenericChart').extend('XYAxis',{
  showAsGrid : function(){
    this.xaxis.showAsGrid(true);
    this.yaxis.showAsGrid(true);
    return this;
  },
  height : function(height){
    this.xaxis.height(height).ytranslate(height);
    this.yaxis.height(height);
    return this;
  },
  width : function(width){
      this.xaxis.width(width);
      this.yaxis.width(width);
      return this;
  },
  initialize : function(){
      this.xaxis = this.mixin(
          'Axis',
          this.base.append('g')
      ).orient('bottom').axistype('x');

      this.yaxis = this.mixin('Axis',this.base.append('g'))
                       .orient('left')
                       .axistype('y');
  }
});