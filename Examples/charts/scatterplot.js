/**
*	Scatterplot (Bubble chart) creation.
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
  * c : circle color
  */
  var data3 = {
    data: [
      {
        x: 25,
        y: 100,
        c: 'orange',
        r: 8,
        label: {
          text: '1',
          color: 'dodgerblue'
        }
      },
      {
        x: 50,
        y:  40,
        c: 'orange',
        r: 8,
        label: {
          text: '2',
          color: 'dodgerblue'
        }
      },
      {
        x: 75,
        y:  60,
        c: 'orange',
        r: 8,
        label: {
          text: '3',
          color: 'dodgerblue'
        }
      }
    ]
  };

  var data5 = {
    data: [
      {
        x: 25,
        y: 150,
        c: 'blue',
        r: 10,
        label: {
          text: '40',
          color: 'goldenrod'
        }
      },
      {
        x: 50,
        y:  50,
        c: 'blue',
        r: 10,
        label: {
          text: '50',
          color: 'goldenrod'
        }
      },
      {
        x: 75,
        y:  30,
        c: 'blue',
        r: 10,
        label: {
          text: '60',
          color: 'goldenrod'
        }
      }
    ]
  };

  var datagroup22 = [];

  datagroup22.push(data3);
  datagroup22.push(data5);

  /**
  * instances : how many data groups will be rendered
  * root : container div
  * defaultXDomain : default values for x axis
  * xAxisLabel : label along x axis
  * yAxisLabel : label along y axis
  * showAsGrid : grid display
  */
  var options4 = {
    chartName : Charty.CHART_NAMES.SCATTERPLOT,
    instances : 2,
    root : '#chart4',
    defaultXDomain : [0, 100],
    xAxis : {
      name: Charty.AXIS_TYPE.LINEAR,
      spacing: 50
    },
    yAxis : {
      name: Charty.AXIS_TYPE.LINEAR,
      spacing: 25
    },
    axisSystem : Charty.CHART_NAMES.XY_AXIS,
    showAsGrid : true,
    xAxisLabel : 'X Axis',
    yAxisLabel : 'Y Axis'
  };

  /** Simple events */
  var hoverFnt = function (d){
    var args = Array.prototype.slice.call(arguments,0);
    console.log(args);
  };

  var clickEvent = function (element){

    var x = $(element).attr('dx'),
        y = $(element).attr('dy');

    var tpl = '<div><p><b>X: '+ x +', Y: ' + y + '</b></p></div>';

    return tpl;
  };

  /** Events options */
  var evts = [],
      evt1 = { evt : 'mouseover', type : 'function', bind : hoverFnt},
      evt2 = { evt : 'click', type : 'bootstrap', element : 'popover', bind : clickEvent};

  evts.push(evt1);
  evts.push(evt2);

  /** Scatterplot creation */
  var chart4 = Charty.chart(options4);

  var marginOptions4 = {
    marginleft : 70,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.80
  };

  chart4.setDimensions(marginOptions4);

  /** Setting events when drawing */
  chart4.draw(datagroup22, evts);
}));