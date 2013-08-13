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
    'charty/charty'           : '../../../dist/charty',

    /** Conditional loading */
    'implementations'         : 'dynamic'

  },
  shim:{
    'jquery' : {
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

  /**
  Data rendering examples.
  */
  var data1 = {
    rh: 30,
    rw: 30,
    c: 'blueline',
    rc:'gray',
    data: [
      { x: 'A', y: 100, c : 'red'},
      { x: 'B', y: -40, c : 'red'},
      { x: 'C', y: 60, c : 'red'}
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

  /**
  Data test for donut chart with inner text
  */
  var data4 = {
    ir :  90,
    or :  50,
    /*xPosition : 200,
    yPosition : 200,*/
    data : [
      {x : 25 , c: 'red'},
      {x : 175, c: 'gray'}
    ]
  };

  var datagroup1 = [];
      datagroup1.push(data1);
      datagroup1.push(data2);

  var datagroup2 = [];
      datagroup2.push(data1);

  var datagroup4 = [];
      datagroup4.push(data4);

  var options1 = {
    chartName : Charty.CHART_NAMES.BAR_CHART,
    instances : 2,
    root : '#chart1',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS
  };

  var options2 = {
    chartName : Charty.CHART_NAMES.LABELED_TRIANGLE_CHART,
    root : '#chart2',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS
  };

  var options3 = {
    chartName : Charty.CHART_NAMES.LINE_CHART,
    instances : 2,
    root : '#chart3',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS
  };

  var options4 = {
    chartName : Charty.CHART_NAMES.SCATTERPLOT,
    instances : 2,
    root : '#chart4',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
    axisSystem : Charty.CHART_NAMES.XY_AXIS
  };

  var options6 = {
    chartName : Charty.CHART_NAMES.DONUT_INNER_TEXT,
    instances : 1,
    root : '#chart6',
    imgLocation : 'imgCenter',
    /*marginlfactor : 0.8,
    margintfactor : 0.8*/
  };

  var options7 = {
    chartName : Charty.CHART_NAMES.LINE_CHART_CIRCLES,
    instances : 2,
    root : '#chart7',
    xAxis : Charty.AXIS_TYPE.ORDINAL,
    yAxis : Charty.AXIS_TYPE.LINEAR,
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85,
    axisSystem : Charty.CHART_NAMES.YXY_AXIS
  };

  /**
  Initial charts drawing here.
  */
  var chart1 = Charty.chart(options1);
      chart1.draw(datagroup1);

  var chart2 = Charty.chart(options2);
      chart2.draw(datagroup2);

      data1.c = 'redline';
      data2.c = 'blueline';

  var chart3 = Charty.chart(options3);
      chart3.draw(datagroup1);

      data1.c = 'red';
      data2.c = 'blue';

  var chart4 = Charty.chart(options4);
      chart4.draw(datagroup1);

  var chart6 = Charty.chart(options6);
      chart6.draw(datagroup4);

      data1.c = 'redline';
      data2.c = 'blueline';

  var chart7 = Charty.chart(options7);
      chart7.draw(datagroup1);

  /**
  Charts update here.
  */
  setTimeout(function(){

    data1 = {
      c: 'blue',
      rh: 30,
      rw: 30,
      rc:'gray',
      data: [
        { x: 'A', y: 100},
        { x: 'B', y: 40},
        { x: 'C', y: 60},
        { x: 'D', y: 80}
      ]
    };

    data2 = {
      c: 'red',
      r : 8,
      data: [
        { x: 'A', y: 150 },
        { x: 'B', y: 50 },
        { x: 'C', y: 30 },
        { x: 'D', y: 230 }
      ]
    };

    var datagroup4 = [];
        datagroup4.push(data1);
        datagroup4.push(data2);

    var datagroup5 = [];
        datagroup5.push(data1);

    chart1.draw(datagroup4);
    chart2.draw(datagroup5);

    data1.c = 'redline';
    data2.c = 'blueline';

    chart3.draw(datagroup4);

    data1.c = 'gray';
    data1.r = 12;
    data2.c = 'red';
    data2.r = 8;

    chart4.draw(datagroup4);

    var data9 = {
      ir :  50,
      or :  90,
      data : [
        {x : 50 , c: 'blue'},
        {x : 155, c: 'gray'}
      ]
    };

    var datagroup7 = [];
        datagroup7.push(data9);

    chart6.draw(datagroup7);

  },3000);
});
