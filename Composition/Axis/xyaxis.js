/**
Base XY system for all the 2D charts.

@class XYAxis
@constructor
@extends BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('BaseChart').extend('XYAxis',{
  initialize : function(){
      this.xaxis = this.mixin(
          'Axis',
          this.base.append('g')
      ).orient('bottom').axistype('x');

      this.yaxis = this.mixin('Axis',this.base.append('g'))
                       .orient('left')
                       .axistype('y');

      this.componentsMixins = [];
      this.componentsMixins.push(this.xaxis);
      this.componentsMixins.push(this.yaxis);
  },
  /**
  Show whole chart as a grid.

  @method
  @chainable
  */
  showAsGrid : function(){
    this.xaxis.showAsGrid(true);
    this.yaxis.showAsGrid(true);
    return this;
  },
  /**
  Propagate height to components

  @method
  @param {Number} newHeight height set for all components
  @chainable
  */
  height : function(newHeight){
    this.xaxis.height(newHeight).ytranslate(newHeight);
    this.yaxis.height(newHeight);
    return this;
  },
  /**
  Propagate width to components

  @method
  @param {Number} newHeight height set for all components
  @chainable
  */
  width : function(newWidth){
      this.xaxis.width(newWidth);
      this.yaxis.width(newWidth);
      return this;
  }
});