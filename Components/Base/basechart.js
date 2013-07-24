/**
Base class for charts
Contains common functionality

@class BaseChart
@requires d3,
          underscore,
          d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define(['d3',
      'underscore',
      'd3.chart'],
      function(d3, _) {
        /** Export global even in AMD case in case this script 
        is loaded with others */
        return factory(d3, _);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, _);
  }
}(this, function(d3, _) {
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
      };

      if(!newWidth || !_.isNumber(newWidth) || newWidth < 0){
        throw new Error('Invalid width value for chart.');
      };

      this.w = newWidth;
      if(this.componentsMixins){
        this.componentsMixins.forEach(function(element){
          element.width(newWidth);
        });
      }

      return this;
    },
    /**
    Sets the height for the chart. Propagates to
    components.

    @method
    @param {Number} newHeight height for the chart
    */
    height : function(newHeight){

      if(arguments.length === 0){
        return this.h;
      };

      if(!newHeight || !_.isNumber(newHeight) || newHeight < 0){
        throw new Error('Invalid height value for chart.');
      };

      this.h = newHeight;
      if(this.componentsMixins){
        this.componentsMixins.forEach(function(element){
          element.height(newHeight);
        });
      }

      return this;
    },
    /**
    Sets the scale type for the x data mapping chart.
    Propagates to components

    Not all charts use scales. Some can use direct
    mapping. 

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
    Sets the scale type for the y data mapping chart.
    Propagates to components.

    Not all charts use scales. Some can use direct
    mapping. 

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
    },
    /**
    Checks if scales were set

    @method
    */
    checkScales : function(chart){
      if(!this.xscale){
        throw new Error('Undefined x scale for '+ chart +' chart');
      }
      else{
        if(!this.yscale){
          throw new Error('Undefined x scale for '+ chart +' chart');
        }
      }
    }
  });
 })
);