/**
Main Application

Testing chart drawing and data update
*/

require.config({
  baseUrl : '..',
  paths : {

    /** Libraries */

    /*'d3'                      : 'Libs/d3.v3',*/
    'd3.chart'                : 'Libs/d3.chart',
    'jquery'                  : 'Libs/jquery-1.10.2',
    'underscore'              : 'Libs/underscore',

    /** Api */

    'chartsapi'               : 'Api/chartsapi',

    /** Components */

    'axis'                    : 'Components/Axis/axis',
    'bar'                     : 'Components/Bar/bar',
    'basescale'               : 'Components/Scales/basescale',
    'basechart'               : 'Components/Base/basechart',
    'linearscale'             : 'Components/Scales/linearscale',
    'ordinalscale'            : 'Components/Scales/ordinalscale',
    'scalesfactory'           : 'Components/Scales/scalesfactory',
    'triangle'                : 'Components/Triangle/triangle',
    'textlabel'               : 'Components/TextLabel/textlabel',
    'roundedrectangle'        : 'Components/RoundedRectangle/roundedrectangle',
    'line'                    : 'Components/Line/line',
    'circle'                  : 'Components/Circle/circle',
    'donut'                   : 'Components/Donut/donut',

    /** Composition */

    'xyaxis'                  : 'Composition/Axis/xyaxis',
    'yxyaxis'                 : 'Composition/Axis/yxyaxis',
    'barchart'                : 'Composition/BarChart/barchart',
    'multipleinstancesmixin'  : 'Composition/multipleinstancesmixin',
    'multipledatagroup'       : 'Composition/multipledatagroup',
    'simpledatagroup'         : 'Composition/simpledatagroup',
    'labeledtrianglechart'    : 'Composition/LabeledTriangleChart/labeledtrianglechart',
    'linechart'               : 'Composition/LineChart/linechart',
    'scatterplot'             : 'Composition/Scatterplot/scatterplot',
    'groupedbarchart'         : 'Composition/GroupedBarChart/groupedbarchart',
    'donutwithinnertext'      : 'Composition/DonutWithInnerText/donutwithinnertext',
    'labeleddonutchart'       : 'Composition/LabeledDonutChart/labeleddonutchart',
    'linechartcircles'        : 'Composition/LineChart/linechartcircles',

    /** Utils */
    'accessor'                : 'Utils/Accessor/accessor',

    /** Test */

    'computedStyle'           : 'Libs/getComputedStyle',
    'd3'                      : 'Libs/r2d3/r2d3',
    'bind'                    : 'Libs/bindFunction'


  },
  shim:{
    'underscore' : {
      exports : '_'
    },
    /*'computedStyle' : {
      exports : 'getComputedStyle'
    },*/
    'd3' : {
      exports :'d3'
    },
    'd3.chart' : {
     /* deps : ['d3'],*/
      exports : 'd3'
    }
  }
});

requirejs(['chartsapi','accessor','underscore','jquery'],
function(ChartsApi, Accessor,_,$){

  'use strict';

  /**
  Data rendering examples.
  */
  var data1 = {
    z : '2011',
    rh: 30,
    rw: 30,
    color: 'blueline',
    rc:'gray',
    data: [
      { x: 'A', y: 100, c : 'red', z: '2011'},
      { x: 'B', y: -40, c : 'red', z: '2011'},
      { x: 'C', y: 60, c : 'red', z: '2011' }
    ]
  };

  var data2 = {
    z : '2012',
    color: 'redline',
    data: [
      { x: 'A', y: 150 , c:'blue', z: '2012'},
      { x: 'B', y: 50 , c: 'blue', z: '2012'},
      { x: 'C', y: 30, c:'blue' , z: '2012' }
    ]
  };

  /**
  Data test for labeled donut chart.
  */
  var data3 = {
    circleCorrection : 0.1,
    innerRectangleCorrection : 0.3,
    innerRectangleColor : 'white',
    outterTextYCorrection : 0.65,
    innerTextXCorrection : 0.28,
    innerTextYCorrection : 0.65,
    r : 5,
    ir :  50,
    or :  90,
    rh: 30,
    rw: 160,
    rc : 'lightgray',
    data : [
      {x : 200, c : 'blue', textlabel : 'Complete', xlabel : 25, ylabel : 100},
      {x : 300, c : 'red', textlabel : 'Not started' ,xlabel : 25, ylabel : 200}/*,
      {x : 150, c : 'yellow', xlabel : 100, ylabel : 250},
      {x :  50, c : 'green', xlabel : 100, ylabel : 50}*/
    ]
  };

  /**
  Data test for donut chart with inner text
  */
  var data4 = {
    ir :  90,
    or :  50,
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

  var datagroup3 = [];
      datagroup3.push(data3);

  var datagroup4 = [];
      datagroup4.push(data4);

  var accessor1 = new Accessor(datagroup1);
  var accessor2 = new Accessor(datagroup2);
  var accessor3 = new Accessor(datagroup3);
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
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options2 = {
    chartName : 'LabeledTriangleChart',
    root : '#chart2',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options3 = {
    chartName : 'LineChart',
    instances : 2,
    root : '#chart3',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options4 = {
    chartName : 'Scatterplot',
    instances : 2,
    root : '#chart4',
    xAxis : 'ordinal',
    yAxis : 'linear',
    /*imgUrl : 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png',*/
    marginleft : 50,
    margintop : 20,
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options5 = {
    chartName : 'LabeledDonutChart',
    instances : 1,
    root : '#chart5',
    /*imgUrl : 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png',*/
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options6 = {
    chartName : 'DonutWithInnerText',
    instances : 1,
    root : '#chart6',
    marginlfactor : 2,
    margintfactor : 4.2
  };

  var options7 = {
    chartName : 'LineChartCircles',
    instances : 2,
    root : '#chart7',
    xAxis : 'ordinal',
    yAxis : 'linear',
    marginleft : 50,
    margintop : 20,
    marginlfactor : 2,
    margintfactor : 4.2
  };

  /**
  Initial charts drawing here.
  */
  var chart1 = myApi.chart(options1);
      chart1.draw(accessor1);

  var chart2 = myApi.chart(options2);
      chart2.draw(accessor2);

      data1.color = 'redline';
      data2.color = 'blueline';

  var chart3 = myApi.chart(options3);
      chart3.draw(accessor1);

      data1.color = 'red';
      data2.color = 'blue';

  var chart4 = myApi.chart(options4);
      chart4.draw(accessor1);

  var chart5 = myApi.chart(options5);
      chart5.draw(accessor3);

  var chart6 = myApi.chart(options6);
      chart6.draw(accessor4);

      data1.color = 'redline';
      data2.color = 'blueline';

  var chart7 = myApi.chart(options7);
      chart7.draw(accessor1);

  /**
  Charts update here.
  */
  setTimeout(function(){

    data1 = {
      color: 'blue',
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
      color: 'red',
      r : 8,
      data: [
        { x: 'A', y: 150 },
        { x: 'B', y: 50 },
        { x: 'C', y: 30 },
        { x: 'D', y: 230 }
      ]
    };

    data3 = {
      ir :  50,
      or :  90,
      data : [
        {x : 200, c : 'blue'},
        {x : 300, c : 'red'},
        {x : 150, c : 'yellow'},
        {x :  50, c : 'green'},
        {x : 400, c: 'gray'}
      ]
    };

    var datagroup4 = [];
        datagroup4.push(data1);
        datagroup4.push(data2);

    accessor1.setData(datagroup4);

    var datagroup5 = [];
        datagroup5.push(data1);

    var datagroup6 = [];
        datagroup6.push(data3);

    accessor2.setData(datagroup5);
    accessor3.setData(datagroup6);

    chart1.draw(accessor1);
    chart2.draw(accessor2);

    data1.color = 'redline';
    data2.color = 'blueline';

    chart3.draw(accessor1);

    data1.color = 'gray';
    data1.r = 12;
    data2.color = 'red';
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
