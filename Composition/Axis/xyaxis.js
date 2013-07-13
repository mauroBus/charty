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
    this.h = newHeight; 
    this.xaxis.height(newHeight).ytranslate(newHeight);
    this.yaxis.height(newHeight).tickSize(newHeight);
    return this;
  },
  /**
  Propagate width to components

  @method
  @param {Number} newHeight height set for all components
  @chainable
  */
  width : function(newWidth){
    this.w = newWidth; 
    this.xaxis.width(newWidth).tickSize(newWidth);
    this.yaxis.width(newWidth);
    return this;
  },
  /**
  Redefinition of x scale setter

  @method
  @param {Object} scale d3.scale
  @chainable
  */
  setXScale : function(scale){
    this.xaxis.setScale(scale);
    return this;
  },
  /**
  Redefinition of y scale setter

  @method
  @param {Object} scale d3.scale
  @chainable
  */
  setYScale : function(scale){
    this.yaxis.setScale(scale);
    return this;
  }
});