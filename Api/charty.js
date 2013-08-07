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

  var Charty = {

  };

  Charty.CHART_NAMES = {
    AXIS: 'Axis',
    BAR: 'Bar',
    BASE_CHART: 'BaseChart',
    CIRCLE: 'Circle',
    DONUT: 'Donut',
    LINE: 'Line',
    ROUNDED_RECTANGLE: 'RoundedRectangle',
    TEXT: 'Text',
    TRIANGLE: 'Triangle',
    XY_AXIS: 'XYAxis',
    YXY_AXIS: 'YXYAxis',
    BAR_CHART: 'BarChart',
    LABELED_TRIANGLE_CHART: 'LabeledTriangleChart',
    SCATTERPLOT: 'Scatterplot',
    MULTIPLE_DATA_GROUP: 'MultipleDataGroup',
    MULTIPLE_INSTANCES_MIXIN: 'MultipleInstancesMixin',
    SIMPLE_DATA_GROUP: 'SimpleDataGroup',
    BAR_CHART : 'BarChart',
    DONUT_INNER_TEXT : 'DonutWithInnerText',
    GROUPED_BAR_CHART : 'GroupedBarChart',
    LINE_CHART : 'LineChart',
    LINE_CHART_CIRCLES : 'LineChartCircles'
  };

  /**
  Axis types are defined as constants
  */
  Charty.AXIS_TYPE = {
    ORDINAL: 'ordinal',
    LINEAR: 'linear'
  };

  /**
  Axis defined as constants
  */
  Charty.AXIS = {
    X : 'x',
    Y : 'y'
  };

  return Charty;
}));