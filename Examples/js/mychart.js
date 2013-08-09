/**
Main Application

Testing chart drawing and data update

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
require.config({
  paths : {
    /** Libraries */
    'd3'                      : '../../vendor/d3/d3.min',
    'r2d3'                    : '../../vendor/r2d3/r2d3',
    'd3.chart'                : '../../vendor/d3.chart/d3.chart.min',
    'underscore'              : '../../vendor/underscore/underscore-min',
    'feature'                 : '../../vendor/feature/feature',
    'jquery'                  : '../../vendor/jquery/jquery.min',

    /** Conditional loading */
    'implementations'         : 'dynamic',

    /** Test */
    'chartsapi'               : '../../dist/charty',

    /** Utils */
    'accessor'                : '../../utils/accessor/accessor',
    'datavalidator'           : '../../utils/datavalidator/datavalidator'
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

requirejs(['chartsapi','accessor'],
function(ChartsApi, Accessor){

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

  var accessor1 = new Accessor(datagroup1);
  var accessor2 = new Accessor(datagroup2);
  var accessor4 = new Accessor(datagroup4);

  var myApi = new ChartsApi();

  var options1 = {
    chartName : 'BarChart',
    instances : 2,
    root : '#chart1',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  var options2 = {
    chartName : 'LabeledTriangleChart',
    root : '#chart2',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  var options3 = {
    chartName : 'LineChart',
    instances : 2,
    root : '#chart3',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  var options4 = {
    chartName : 'Scatterplot',
    instances : 2,
    root : '#chart4',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  var options6 = {
    chartName : 'DonutWithInnerText',
    instances : 1,
    root : '#chart6',
    imgLocation : 'imgCenter',
    /*marginlfactor : 0.8,
    margintfactor : 0.8*/
  };

  var options7 = {
    chartName : 'LineChartCircles',
    instances : 2,
    root : '#chart7',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 0.85,
    margintfactor : 0.85
  };

  /**
  Initial charts drawing here.
  */
  var chart1 = myApi.chart(options1);
      chart1.draw(accessor1);

  var chart2 = myApi.chart(options2);
      chart2.draw(accessor2);

      data1.c = 'redline';
      data2.c = 'blueline';

  var chart3 = myApi.chart(options3);
      chart3.draw(accessor1);

      data1.c = 'red';
      data2.c = 'blue';

  var chart4 = myApi.chart(options4);
      chart4.draw(accessor1);

  var chart6 = myApi.chart(options6);
      chart6.draw(accessor4);

      data1.c = 'redline';
      data2.c = 'blueline';

  var chart7 = myApi.chart(options7);
      chart7.draw(accessor1);

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

    accessor1.setData(datagroup4);

    var datagroup5 = [];
        datagroup5.push(data1);

    accessor2.setData(datagroup5);

    chart1.draw(accessor1);
    chart2.draw(accessor2);

    data1.c = 'redline';
    data2.c = 'blueline';

    chart3.draw(accessor1);

    data1.c = 'gray';
    data1.r = 12;
    data2.c = 'red';
    data2.r = 8;

    chart4.draw(accessor1);

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

    var accessor7 = new Accessor(datagroup7);
    chart6.draw(accessor7);

  },3000);
});
