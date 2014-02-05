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
          { x: 'A', y: 100},
          { x: 'B', y: -10},
          { x: 'C', y: -80},
          { x: 'D', y: -40},
          { x: 'E', y:  60},
          { x: 'F', y:  90},
          { x: 'G', y:  50},
          { x: 'H', y: -30},
          { x: 'I', y:  50},
          { x: 'J', y: -30}
        ]
    };

    /** Data series */
    var datagroup666 = [];
    datagroup666.push(data666);

    /** Logic to be moved */
    var peakValleyDomain = function (data, func) {
      var peak = 0, valley = 0, sum = 0;
      for (var i = 0; i < data.length; i++) {
        if (func) {
          sum = sum + func(data[i]);
        } else {
          sum = sum + data[i];
        }
        if (sum > peak) {
          peak = sum;
        } else if (sum < valley) {
          valley = sum;
        }
      };
      return [valley, peak];
    };

    var yDomain = peakValleyDomain(data666.data, function (data) {
      return data.y;
    });

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
        labelType : Charty.CHART_NAMES.VALUE_DEPENDANT_TEXT,
        root : '#chart11',
        xAxis : Charty.AXIS_TYPE.ORDINAL,
        yAxis : Charty.AXIS_TYPE.LINEAR,
        axisSystem : Charty.CHART_NAMES.YXY_AXIS,
        showAsGrid : true,
        setTextLabels : true,
        defaultYDomain: yDomain
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