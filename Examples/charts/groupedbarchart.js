/** 
* Grouped bar chart instantiation
*
* Note : this is still under development
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
  * Data Test for Grouped bar chart 
  *
  * z : element grouping
  * c : element color
  */
  var data88 = {
    data : [
      {x : 'A', y : 100, z : '2012', c : 'green'},
      {x : 'B', y :  50, z : '2012', c : 'red'},
      {x : 'C', y : 150, z : '2012', c : 'blue'},
      {x : 'A', y :  30, z : '2013', c : 'green'},
      {x : 'B', y :  70, z : '2013', c : 'blue'},
      {x : 'C', y : 180, z : '2013', c : 'blue'}
    ]
  };

  var datagroup33 = [];

  datagroup33.push(data88);

  /** 
  * defaultZDomain : specific domain for Z mapping (grouping)
  * showAsGrid : a line for every tick, vertical / horizontal
  * axisSystem : can be XY / XYX 
  * root : container div
  * instances : how many data groups are for drawing
  *
  * zAxis must be same type as xAxis
  */
  var options8 = {
    chartName : Charty.CHART_NAMES.GROUPED_BAR_CHART,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    zAxis : Charty.AXIS_TYPE.ORDINAL,
    defaultZDomain : ['2012','2013'],
    yAxis : Charty.AXIS_TYPE.LINEAR,
    root : '#chart8',
    showAsGrid : true
  };

  /** Grouped bar chart */
  var chart8 = Charty.chart(options8);

  var marginOptions8 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  /** Simple hover event */
  var hoverEvent = function (d){
    var args = Array.prototype.slice.call(arguments,0);
    console.log(args);
  };

  /** Bootstrap event will execute this function */
  var clickEvent = function (element){

    var x = $(element).attr('x'),
        y = $(element).attr('y');

    var tpl = '<div><p><b>X: '+ x +', Y: ' + y + '</b></p></div>';

    return tpl;
  };

  /** Events objects with options */
  var evt1 = { evt : 'mouseover', type : 'function', bind : hoverEvent},
      evt3 = { evt : 'click', type : 'bootstrap', element : 'popover', bind : clickEvent};

  /** 
  * Events are pushed to an array
  */
  var evts2 = [];
  evts2.push(evt1);
  evts2.push(evt3);

  chart8.setDimensions(marginOptions8);

  /** Events are sent when drawing */
  chart8.draw(datagroup33, evts2);
}));