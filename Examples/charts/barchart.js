/** 
* Simple horizontal bar chart example
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
    * Chart data 
    *
    * c : element color
    */
    var data51 = {
        data: [
          { y: 'A', x: 100, c : 'red'},
          { y: 'B', x: -40, c : 'red'},
          { y: 'C', x: 60, c : 'red'}
        ]
    };

    var data52 = {
        data: [
          { y: 'A', x: 150 , c:'blue'},
          { y: 'B', x: 50 , c: 'blue'},
          { y: 'C', x: 30, c:'blue'}
        ]
    };

    /** Data series */
    var datagroup51 = [];

    datagroup51.push(data51);
    datagroup51.push(data52);

    /** 
    * Bar chart options
    * 
    * xTickCount : how many ticks will be displayed along x axis
    * showAsGrid : a line for every tick, vertical / horizontal
    * axisSystem : can be XY / XYX 
    * root : container div
    * barType : horizontal / vertical
    * instances : how many data groups are for drawing
    * setTextLabels : shows labels above bars
    */
    var options1 = {
        chartName : Charty.CHART_NAMES.BAR_CHART,
        barType : Charty.CHART_NAMES.HORIZONTAL_BAR,
        instances : 2,
        root : '#chart1',
        xAxis : Charty.AXIS_TYPE.LINEAR,
        yAxis : Charty.AXIS_TYPE.ORDINAL,
        axisSystem : Charty.CHART_NAMES.XY_AXIS,
        xTickCount : 4,
        showAsGrid : true,
        setTextLabels : true
    };

    /** Bar chart creation */
    var chart1 = Charty.chart(options1);

    /** Margin specifications */
    var marginOptions1 = {
        marginleft : 30,
        margintop : 40,
        marginlfactor : 0.85,
        margintfactor : 0.80
    };

    chart1.setDimensions(marginOptions1);
    
    /** 
    * Needs x and y position
    */
    chart1.setTitle('I hate that Donut Chart guy.', 200, 0);
    chart1.draw(datagroup51);
}));