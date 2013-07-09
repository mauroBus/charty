/**
  Base class for charts
  Contains common functionality

  @class BaseChart

  @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"  
*/
d3.chart('BaseChart',{
  /**
    Sets the width for the chart
    In case chart contains components, width will
    propagate to them

    @method
    @param {Number} newWidth width for the chart
    @chainable
  */
  width : function(newWidth){
    if(arguments.length === 0){
      return this.w;
    }
    this.w = newWidth;
    if(this.componentsMixins){
      this.componentsMixins.forEach(function(element){
        element.width(newWidth);
      }); 
    }
    return this;
  },
  /**
    Sets the height for the chart
  
    @method
    @param {Number} newHeight height for the chart
  */
  height : function(newHeight){
    if(arguments.length === 0){
      return this.h;
    }
    this.h = newHeight;
    if(this.componentsMixins){
      this.componentsMixins.forEach(function(element){
        element.height(newHeight);
      }); 
    }
    return this;
  },
  /**
    Sets the scale type for the x data mapping chart

    @method
    @param {Oject} LinearScale, OrdinalScale
    @chainable
  */
  setXScale : function(scale){
    this.xscale = scale;
    if(this.componentsMixins){
      this.componentsMixins.forEach(function(element){
        element.setXScale(scale);
      }); 
    }
    return this;
  },
  /**
    Sets the scale type for the y data mapping chart

    @method
    @param {Oject} LinearScale, OrdinalScale
    @chainable
  */
  setYScale : function(scale){
    this.yscale = scale;
    if(this.componentsMixins){
      this.componentsMixins.forEach(function(element){
        element.setYScale(scale);
      }); 
    }
    return this; 
  }
});