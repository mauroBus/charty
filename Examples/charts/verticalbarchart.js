/** 
* Simple vertical bar chart example (same construction as horizontal bar chart)
* 
* Regarding horizontal bar chart : linear scales types are switched.
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
          { x: 'A', y: 100, c : 'red'},
          { x: 'B', y: -40, c : 'red'},
          { x: 'C', y:  60, c : 'red'}
        ]
    };

    var data52 = {
        data: [
          { x: 'A', y: 150, c: 'blue'},
          { x: 'B', y:  50, c: 'blue'},
          { x: 'C', y:  30, c: 'blue'}
        ]
    };

    /** Data series */
    window.datagroup51 = [];

        window.datagroup51.push(data51);
        window.datagroup51.push(data52);

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
    * labelType : positioning for the labels.
    */
    var options9 = {
        chartName : Charty.CHART_NAMES.BAR_CHART,
        barType : Charty.CHART_NAMES.BAR,
        labelType : Charty.CHART_NAMES.ABOVE_TEXT,
        instances : 2,
        root : '#chart9',
        xAxis : Charty.AXIS_TYPE.ORDINAL,
        yAxis : Charty.AXIS_TYPE.LINEAR,
        axisSystem : Charty.CHART_NAMES.XY_AXIS,
        xTickCount : 4,
        showAsGrid : true,
        setTextLabels : true
    };

    /** Bar chart creation */
    window.chart9 = Charty.chart(options9);

    /** Margin specifications */
    var marginOptions9 = {
        marginleft : 30,
        margintop : 40,
        marginlfactor : 0.85,
        margintfactor : 0.80
    };

    chart9.setDimensions(marginOptions9);
    
    /** 
    * Needs x and y position
    */
    chart9.setTitle('For Zion!', 250, 0);
    chart9.draw(datagroup51);
}));