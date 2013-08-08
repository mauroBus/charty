/**
Defines a YXY axis system.
Two Y Axis (one left, one right)
One X Axis (bottom)

@class YXYAxis
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
    define('yxyaxis',[
      'd3.chart',
      'charty',
      'axis',
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.YXY_AXIS, {
    /**
    Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

    @method
    */
    initialize : function(){
      this.xaxis = this.mixin(charty.CHART_NAMES.AXIS, this.base.append('g')).orient('bottom');
      this.yaxisleft = this.mixin(charty.CHART_NAMES.AXIS,this.base.append('g')).orient('left');
      this.yaxisright = this.mixin(charty.CHART_NAMES.AXIS, this.base.append('g')).orient('right');

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
    Sets x axis position and tick size

    @method
    @param {Number} newHeight chart's height
    @chainable
    */
    height : function(newHeight){
      this.xaxis.ytranslate(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Sets y axis disposition, based on a given
    width value, and tick size for only one y axis.

    @method
    @param {Number} newWidth chart's width
    @chainable
    */
    width : function(newWidth){
      this.yaxisright.xtranslate(newWidth);
      this.yaxisleft.tickSize(newWidth);
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
      this.yaxisleft.setScale(scale);
      this.yaxisright.setScale(scale);
      return this;
    }
  });
}));