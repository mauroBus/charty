/**
Base XY system for all the 2D charts.

@class XYAxis
@constructor
@requires d3.chart,
          charty,
          axis

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/xyaxis',[
      'd3.chart',
      'charty/chartynames',
      'charty/axis'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.XY_AXIS, {
    /**
    XY axis system initializer

    @method
    */
    initialize : function(args){

        this.xaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                                this.base.append('g'),
                                args).orient('bottom');

        this.yaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                                this.base.append('g'),
                                args).orient('left');

    },
    /**
    Show whole chart as a grid.

    @method
    @chainable
    */
    showAsGrid : function (showAsGrid){
      this.xaxis.showAsGrid(showAsGrid);
      this.yaxis.showAsGrid(showAsGrid);
      return this;
    },
    /**
    Moves x axis according to given height value, and sets
    tick size value.

    @method
    @param {Number} newHeight chart's height
    @chainable
    */
    height : function (newHeight){
      this.xaxis.ytranslate(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Sets tick size, based on given width value

    @method
    @param {Number} newWidth chart's width
    @chainable
    */
    width : function (newWidth){
      this.yaxis.tickSize(newWidth);
      return this;
    },
    /**
    Sets x scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setXScale : function (scale){
      this.xaxis.setScale(scale);
      return this;
    },
    /**
    Sets y scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setYScale : function (scale){
      this.yaxis.setScale(scale);
      return this;
    }
  });
}));