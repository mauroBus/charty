/** 
* Win Loss Bar chart example.
* 
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
    */
    var data666 = {
        data: [
          { x: 'A',     y: 100},
          { x: 'B',     y: -10},
          { x: 'C',     y: -80},
          { x: 'D',     y: -40},
          { x: 'E',     y:  60},
          { x: 'F',     y:  90},
          { x: 'G',     y: -30},
          { x: 'H',     y:  50},
          { x: 'Total', y: 140, reset: true, c: 'green'},
          { x: 'Cost',  y: -20, c: 'purple'},
          { x: 'Net',   y: 120, reset: true, c: 'orange' }
        ]
    };

document.data = data666.data;

    /** Data series */
    var datagroup666 = [];
    datagroup666.push(data666);

    /** 
    * Bar chart options
    * 
    * showAsGrid : a line for every tick, vertical / horizontal
    * labelType: changes value position depending on the label value.
    * axisSystem : can be XY / XYX 
    * root : container div
    * barType : Win Loss bar
    * setTextLabels : shows labels above bars
    */
    var options11 = {
        chartName : Charty.CHART_NAMES.BAR_CHART,
        barType : Charty.CHART_NAMES.WIN_LOSS_BAR,
        labelType : Charty.CHART_NAMES.WIN_LOSS_TEXT,
        root : '#chart11',
        xAxis : Charty.AXIS_TYPE.ORDINAL,
        yAxis : Charty.AXIS_TYPE.PEAK_VALLEY_LINEAR,
        axisSystem : Charty.CHART_NAMES.YXY_AXIS,
        showAsGrid : true,
        setTextLabels : true
    };

    /** Bar chart creation */
    var chart11 = Charty.chart(options11);

    /** Margin specifications */
    var marginOptions11 = {
        marginleft : 30,
        margintop : 40,
        marginlfactor : 0.85,
        margintfactor : 0.80
    };

    chart11.setDimensions(marginOptions11);
    
    chart11.draw(datagroup666);
}));
