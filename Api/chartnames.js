/**
Define constants that will be used as names for different parts

@class ChartNames

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define(
      function() {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory();
    });
  }
  else {
    /** Browser globals */
    return factory();
  }
}(this, function() {

  var ChartNames = function(){

  };

  ChartNames.prototype.CHART_NAMES = {
    AXIS: 'Axis',
    BAR: 'Bar',
    BASE_CHART: 'BaseChart',
    CIRCLE: 'Circle',
    DONUT: 'Donut',
    LINE: 'Line',
    ROUNDED_RECTANGLES: 'RoundedRectangle',
    TEXT_LABEL: 'TextLabel',
    TRIANGLE: 'Triangle',
    XY_AXIS: 'XYAxis',
    YXY_AXIS: 'YXYAxis',
    BAR_CHART: 'BarChart',
    LABELED_TRIANGLE_CHART: 'LabeledTriangleChart',
    SCATTERPLOT: 'Scatterplot',
    MULTIPLE_DATA_GROUP: 'MultipleDataGroup',
    MULTIPLE_INSTANCES_MIXIN: 'MultipleInstancesMixin',
    SIMPLE_DATA_GROUP: 'SimpleDataGroup'
  };

  /**
  Axis types are defined as constants
  */
  ChartNames.prototype.AXIS_TYPES = {
    ORDINAL: 'ordinal',
    LINEAR: 'linear'
  };

  return ChartNames;
}));