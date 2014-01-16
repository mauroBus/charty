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
      { x:  25, y: 100, c : 'red'},
      { x:  50, y:  40, c : 'red'},
      { x:  75, y:  60, c : 'red'}
    ]
  };

  var data5 = {
    data: [
      { x: 25,  y: 150, c : 'blue'},
      { x: 50,  y:  50, c : 'blue'},
      { x: 75,  y:  30, c : 'blue'}
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
    xAxis : Charty.AXIS_TYPE.LINEAR,
    yAxis : Charty.AXIS_TYPE.LINEAR,
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
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.80
  };

  chart4.setDimensions(marginOptions4);

  /** Setting events when drawing */
  chart4.draw(datagroup22, evts);
}));