/**
Base XY system for all the 2D charts.

@class XYAxis
@constructor
@requires d3.chart,
          axis

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'axis'
      ],
      function(d3) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3);
    });
  }
  else {
    /** Browser globals */
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('XYAxis',{
    /**
    XY axis system initializer

    @method
    */
    initialize : function(){

        this.xaxis = this.mixin('Axis',this.base.append('g'))
                         .orient('bottom');

        this.yaxis = this.mixin('Axis',this.base.append('g'))
                         .orient('left');

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
    Moves x axis according to given height value, and sets
    tick size value. 

    @method
    @param {Number} newHeight chart's height
    @chainable
    */
    height : function(newHeight){
      this.xaxis.ytranslate(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Sets tick size, based on given width value

    @method
    @param {Number} newWidth chart's width
    @chainable
    */
    width : function(newWidth){
      this.yaxis.tickSize(newWidth);
      return this;
    },
    /**
    Sets x scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setXScale : function(scale){
      this.xaxis.setScale(scale);
      return this;
    },
    /**
    Sets y scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setYScale : function(scale){
      this.yaxis.setScale(scale);
      return this;
    }
  });
}));