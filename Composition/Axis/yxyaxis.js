/**
Defines a YXY axis system. 
Two Y Axis (one left, one right)
One X Axis (bottom)

@class YXYAxis
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
d3.chart('BaseChart').extend('YXYAxis',{
  /**
  Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

  @method
  */
  initialize : function(){
    this.xaxis = this.mixin('Axis', this.base.append('g')).orient('bottom').axistype('x');
    this.yaxisleft = this.mixin('Axis',this.base.append('g')).orient('left').axistype('y');
    this.yaxisright = this.mixin('Axis', this.base.append('g')).axistype('y').orient('right');

    this.componentsMixins = [];
    this.componentsMixins.push(this.xaxis);
    this.componentsMixins.push(this.yaxisleft); 
    this.componentsMixins.push(this.yaxisright);  
  },
  /**
  Show whole chart as a grid.

  @method
  @chainable
  */
  showAsGrid : function(){
    this.xaxis.showAsGrid(true);
    this.yaxisleft.showAsGrid(true);
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
    this.yaxisright.height(newHeight);
    this.yaxisleft.height(newHeight);
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
    this.yaxisright.width(newWidth).xtranslate(newWidth);
    this.yaxisleft.width(newWidth);
    return this;
  }
});