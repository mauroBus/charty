/**
* Line chart creation.
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'charty/charty'
      ],
      function (Charty) {
      /** Export global even in AMD case in case this script
      * is loaded with others */
      return factory(Charty);
    });
  }
  else {
    /** Browser globals */
    factory(Charty);
  }
}(this, function (Charty) {

  "use strict";

  /**
  * c : line color. Defined like "blueline" because it is not the same as "blue" (see CSS)
  */
  var data1 = {
    c: 'blueline',
    data: [
      { x: 'A', y: 2 },
      { x: 'B', y: 2 },
      { x: 'C', y: 2 }
    ]
  };

  var data2 = {
    c: 'redline',
    data: [
      { x: 'A', y: -150},
      { x: 'B', y: 50 },
      { x: 'C', y: 30 }
    ]
  };

  var datagroup1 = [];

  datagroup1.push(data1);
  datagroup1.push(data2);

  /**
    * instances : how many data groups are rendered
    * root : containe div
    * showAsGrid : lines along ticks
    */
  var options3 = {
    chartName : Charty.CHART_NAMES.LINE_CHART,
    instances : 2,
    root : '#chart3',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    showAsGrid : true,
    yAxisTickFormat: '$d'
  };

  /** Line chart creation, instantiation */
  var chart3 = Charty.chart(options3);

  var marginOptions3 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.80,
    margintfactor : 0.85,
  };

  chart3.setDimensions(marginOptions3);
  chart3.draw(datagroup1);
}));
