/**
Main Application

Testing chart drawing and data update

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
require.config({
  paths : {
    /** Libraries */
    'd3'                      : '../../../vendor/d3/d3.min',
    'r2d3'                    : '../../../vendor/r2d3/r2d3',
    'd3.chart'                : '../../../vendor/d3.chart/d3.chart.min',
    'underscore'              : '../../../vendor/underscore/underscore-min',
    'feature'                 : '../../../vendor/feature/feature',
    'jquery'                  : '../../../vendor/jquery/jquery.min',
    'bootstrap'               : '../../../vendor/bootstrap/dist/js/bootstrap.min',
    'charty/charty'           : '../../../dist/charty',

    /** Conditional loading */
    'implementations'         : 'dynamic'

  },
  shim:{
    'jquery' : {
      exports : '$'
    },
    'bootstrap' : {
      deps : ['jquery'],
      exports : '$'
    },
    'underscore' : {
      exports : '_'
    },
    'r2d3' : {
      exports : 'd3'
    },
    'd3' : {
      exports :'d3'
    },
    'd3.chart' : {
      deps : ['feature!d3impl'],
      exports : 'd3'
    }
  }
});

requirejs(['charty/charty'],
function(Charty){

  'use strict';

  var clickFnt = function (d){
    var args = Array.prototype.slice.call(arguments,0);
    console.log(args);
  };

  /**
  Data rendering examples.
  */
  var data1 = {
    rh: 30,
    rw: 30,
    c: 'blueline',
    rc:'gray',
    data: [
      { x: 'A', y: 2, c : 'red', c1: 'red', c2:'blue'},
      { x: 'B', y: 2, c : 'red', c1:'yellow', c2:'green'},
      { x: 'C', y: 2, c : 'red', c1:'green', c2:'yellow'}
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

  /** Horizontal bar chart */
  var data51 = {
    rh: 30,
    rw: 30,
    c: 'blueline',
    rc:'gray',
    data: [
      { y: 'A', x: 100, c : 'red'},
      { y: 'B', x: -40, c : 'red'},
      { y: 'C', x: 60, c : 'red'}
    ]
  };

  var data52 = {
    c: 'redline',
    data: [
      { y: 'A', x: 150 , c:'blue'},
      { y: 'B', x: 50 , c: 'blue'},
      { y: 'C', x: 30, c:'blue'}
    ]
  };

  /**
  Data rendering examples.
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

  /**
  Data test for donut chart with inner text
  */
  var data4 = {
    ir :  110,
    or :  70,
    /*xPosition : 200,
    yPosition : 200,*/
    data : [
      {y : 25 , c: 'red'},
      {y : 175, c: 'gray'}
    ]
  };

  /** Data Test for Grouped bar chart */
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

  var datagroup1 = [];
      datagroup1.push(data1);
      datagroup1.push(data2);

  var datagroup2 = [];
      datagroup2.push(data1);

  var datagroup4 = [];
      datagroup4.push(data4);

  var datagroup22 = [];
      datagroup22.push(data3);
      datagroup22.push(data5);

  var datagroup51 = [];
      datagroup51.push(data51);
      datagroup51.push(data52);

  var options1 = {
    chartName : Charty.CHART_NAMES.BAR_CHART,
    barType : Charty.CHART_NAMES.HORIZONTAL_BAR,
    instances : 2,
    root : '#chart1',
    xAxis : Charty.AXIS_TYPE.LINEAR,
    yAxis : Charty.AXIS_TYPE.ORDINAL,
    axisSystem : Charty.CHART_NAMES.XY_AXIS,
    xTickCount : 4,
    showAsGrid : true
  };

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

  var options3 = {
    chartName : Charty.CHART_NAMES.LINE_CHART,
    instances : 2,
    root : '#chart3',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    showAsGrid : true
  };

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

  var options6 = {
    chartName : Charty.CHART_NAMES.DONUT_INNER_TEXT,
    instances : 1,
    root : '#chart6'
  };

  var options7 = {
    chartName : Charty.CHART_NAMES.LINE_CHART_CIRCLES,
    instances : 2,
    root : '#chart7',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS,
    showAsGrid : true
  };

  /**
  For the first test, only vertical bars are defined

  zAxis : chart uses another scale, like drawing two axis
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

  /**
  Bar chart creation, dimensioning
  */
  var chart1 = Charty.chart(options1);

  var marginOptions1 = {
    marginleft : 30,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };
  chart1.setDimensions(marginOptions1);
  chart1.draw(datagroup51);

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

  data1.c = 'redline';
  data2.c = 'blueline';

  /** Line chart creation, instantiation */
  var chart3 = Charty.chart(options3);

  var marginOptions3 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
  };
  chart3.setDimensions(marginOptions3);
  chart3.draw(datagroup1);

  data1.c = 'red';
  data2.c = 'blue';

  /** Scatterplot creation */
  var chart4 = Charty.chart(options4);

  var marginOptions4 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  var secondEvent = function (element){

    var x = $(element).attr('dx'),
        y = $(element).attr('dy');

    var tpl = '<div><p><b>X: '+ x +', Y: ' + y + '</b></p></div>';

    return tpl;
  };

  var evts = [],
      evt1 = { evt : 'mouseover', type : 'function', bind : clickFnt},
      evt2 = { evt : 'click', type : 'bootstrap', element : 'popover', bind : secondEvent};

  evts.push(evt1);
  evts.push(evt2);

  chart4.setDimensions(marginOptions4);
  chart4.setEvents(evts);
  chart4.draw(datagroup22);

  /** Donut chart with inner text and background image*/
  var chart6 = Charty.chart(options6);
  chart6.setDimensions();
  chart6.setBackgroundImage('imgCenter');
  chart6.draw(datagroup4);

  data1.c = 'redline';
  data2.c = 'blueline';

  /** Mixing scatterplot with lines */
  var chart7 = Charty.chart(options7);

  var marginOptions7 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };
  chart7.setDimensions(marginOptions7);
  chart7.draw(datagroup1);

  /** Grouped bar chart */
  var chart8 = Charty.chart(options8);

  var marginOptions8 = {
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };
  chart8.setDimensions(marginOptions8);
  chart8.draw(datagroup33);
});
