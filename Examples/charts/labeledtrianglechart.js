/** 
* Triangle chart instantiation example. It is defined to take
* only one data serie.
*
* Note : linear gradients won't work in ie8 via r2d3 
* (everything will crash).
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
  * rh : rectangle height
  * rw : rectangle width
  * rc : rectangle color
  * c1 : color for the first half of the triangle
  * c2 : color for the second half of the triangle
  * c : color for whole triangle (overriden by the others)
  */
  var data1 = {
    rh: 30,
    rw: 30,
    rc:'gray',
    data: [
      { x: 'A', y: 2, c : 'red', c1: 'red', c2:'blue'},
      { x: 'B', y: 2, c : 'red', c1:'yellow', c2:'green'},
      { x: 'C', y: 2, c : 'red', c1:'green', c2:'yellow'}
    ]
  };

  /** Data serie */
  var datagroup2 = [];

  datagroup2.push(data1);

  /** 
  * Labeled triangle chart options 
  *
  * root : container div
  * defaultXDomain : default values for x axis
  * yTicksCount : how many ticks are generated for y axis,
  * yAxisFormat : y axis ticks formatter (d3.format specific) -> "d" : only integers
  * gradients : linear gradients. 
  */
  var options2 = {
    chartName : Charty.CHART_NAMES.LABELED_TRIANGLE_CHART,
    root : '#chart2',
    defaultXDomain : ['A', 'B', 'C', 'D', 'E', 'F'],
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    showAsGrid : true,
    yTickCount : 4,
    yAxisTickFormat : "d",
    gradients : [
      {
        id : 'gradient1',
        orientation : 'vertical',
        classes : [
          {className : 'stop1', offset : '0%'},
          {className : 'stop2', offset : '50%'},
          {className : 'stop3', offset : '100%'}
        ]
      }
    ]
  };

  /* Triangle chart creation, dimensioning */
  var marginOptions2 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
  };

  var chart2 = Charty.chart(options2);

  chart2.setDimensions(marginOptions2);
  chart2.draw(datagroup2);
}));