/** 
* Line and circle chart instantiation.
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
  * c : 'blueline' -> for the whole line
  * c : 'red' -> for circles
  */
  var data1 = {
    c: 'blueline',
    data: [
      { x: 'A', y: 2, c : 'red' },
      { x: 'B', y: 2, c : 'red' },
      { x: 'C', y: 2, c : 'red' }
    ]
  };

  var data2 = {
    c: 'redline',
    data: [
      { x: 'A', y: 150 , c:'blue'},
      { x: 'B', y: 50 , c: 'blue'},
      { x: 'C', y: 30, c:'blue'}
    ]
  };

  var datagroup1 = [];

  datagroup1.push(data1);
  datagroup1.push(data2);

  /** Simple events definitions */
  var hoverFnt = function (d){
    var args = Array.prototype.slice.call(arguments,0);
    console.log(args);
  };

  var clickFnt = function (element){

    var x = $(element).attr('dx'),
        y = $(element).attr('dy');

    var tpl = '<div><p><b>X: '+ x +', Y: ' + y + '</b></p></div>';

    return tpl;
  };

  /** Events options */
  var evts = [],
      evt1 = { evt : 'mouseover', type : 'function', bind : hoverFnt},
      evt2 = { evt : 'click', type : 'bootstrap', element : 'popover', bind : clickFnt};

  evts.push(evt1);
  evts.push(evt2);

  /** 
  * root : container div
  * instances : how many data groups will be rendered
  * showAsGrid : grid display
  */
  var options7 = {
    chartName : Charty.CHART_NAMES.LINE_CHART_CIRCLES,
    instances : 2,
    root : '#chart7',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    showAsGrid : true
  };

  /** Mixing scatterplot with lines */
  var chart7 = Charty.chart(options7);

  var marginOptions7 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  chart7.setDimensions(marginOptions7);

  /** Sending events when drawing */
  chart7.draw(datagroup1, evts);
}));