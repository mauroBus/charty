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
    define('charty/yxyaxis',[
      'd3.chart',
      'charty/chartynames',
      'charty/xyaxis'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.YXY_AXIS, {
    /**
    Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

    @method
    */
    initialize : function (args){
      this.xyaxis = this.mixin(Charty.CHART_NAMES.XY_AXIS,
                              this.base.append('g'),
                              args);

      this.yaxisright = this.mixin(Charty.CHART_NAMES.AXIS,
                                   this.base.append('g'),
                                   args).orient('right').tickCount(args.yTickCount).tickFormat(args.yAxisTickFormat);

    },
    /**
    Show whole chart as a grid.

    @method
    @chainable
    */
    showAsGrid : function (showAsGrid){
      this.xyaxis.showAsGrid(showAsGrid);
      return this;
    },
    /**
    * Sets x axis position and tick size
    *
    * @method
    * @param {Number} newHeight chart's height
    * @chainable
    */
    height : function (newHeight){
      this.xyaxis.height(newHeight);
      return this;
    },
    /**
    * Sets y axis disposition, based on a given
    * width value, and tick size for only one y axis.
    *
    * @method
    * @param {Number} newWidth chart's width
    * @chainable
    */
    width : function (newWidth){
      this.yaxisright.xtranslate(newWidth);
      this.xyaxis.width(newWidth);
      return this;
    },
    /**
    * Redefinition of x scale setter
    *
    * @method
    * @param {Object} scale d3.scale
    * @chainable
    */
    setXScale : function (scale){
      this.xyaxis.setXScale(scale);
      return this;
    },
    /**
    * Redefinition of y scale setter
    *
    * @method
    * @param {Object} scale d3.scale
    * @chainable
    */
    setYScale : function (scale){
      this.xyaxis.setYScale(scale);
      this.yaxisright.setScale(scale);
      return this;
    }
  });
}));