//Data structure to render
var data1 = {
  color: 'blue',
  rh: 30,
  rw: 30,
  rc:'gray',
  data: [
    { x: 'A', y: 100, c1 : 'green', c2:'yellow'},
    { x: 'B', y: -40, c1 : 'blue', c2:'yellow' },
    { x: 'C', y: 60, c1 : 'red', c2:'green' }
  ]
};

var data2 = {
  color: 'red',
  r : 8,
  data: [
    { x: 'A', y: 150 },
    { x: 'B', y: 50 },
    { x: 'C', y: 30 }
  ]
};

var data3 = {
  ir :  -100,
  or : -50,
  data : [
    {x : 200, c : 'blue'},
    {x : 300, c : 'red'},
    {x : 150, c : 'yellow'},
    {x :  50, c : 'green'}
  ]
};

var datagroup1 = [];
    datagroup1.push(data1);
    datagroup1.push(data2);

var datagroup2 = [];
    datagroup2.push(data1);

var datagroup3 = [];
    datagroup3.push(data3);

var accessor1 = new Accessor(datagroup1);
var accessor2 = new Accessor(datagroup2);
var accessor3 = new Accessor(datagroup3);

var myApi = new ChartsApi();

var options1 = {
  chartName : 'BarChart',
  instances : 2,
  root : '#chart1',
  xAxis : 'ordinal',
  yAxis : 'linear',
  margin : {
    left : 50,
    top : 20,
    lfactor : 2,
    tfactor : 4.2
  }
};

var options2 = {
  chartName : 'LabeledTriangleChart',
  root : '#chart2',
  xAxis : 'ordinal',
  yAxis : 'linear',
  margin : {
    left : 50,
    top : 20,
    lfactor : 2,
    tfactor : 4.2
  }
}

var options3 = {
  chartName : 'LineChart',
  instances : 2,
  root : '#chart3',
  xAxis : 'ordinal',
  yAxis : 'linear',
  margin : {
    left : 50,
    top : 20,
    lfactor : 2,
    tfactor : 4.2
  }
};

var options4 = {
  chartName : 'Scatterplot',
  instances : 2,
  root : '#chart4',
  xAxis : 'ordinal',
  yAxis : 'linear',
  margin : {
    left : 50,
    top : 20,
    lfactor : 2,
    tfactor : 4.2
  }
};

var options5 = {
  chartName : 'Donut',
  instances : 1,
  root : '#chart5',
  ir : 100,
  or : 50,
  margin : {
    left : 50,
    top : 20,
    lfactor : 2,
    tfactor : 4.2
  }
};

var chart1 = myApi.chart(options1);
    chart1.draw(accessor1);

var chart2 = myApi.chart(options2);
    chart2.draw(accessor2);

    data1.color = 'redline';
    data2.color = 'blueline';

var chart3 = myApi.chart(options3);
    chart3.draw(accessor1);

    data1.color = 'red';
    data1.r = 5;
    data2.color = 'blue';
    data2.r = 8;

var chart4 = myApi.chart(options4);
    chart4.draw(accessor1);

var chart5 = myApi.chart(options5);
    chart5.draw(accessor3);

setTimeout(function(){

  var data1 = {
    color: 'blue',
    rh: 30,
    rw: 30,
    rc:'gray',
    data: [
      { x: 'A', y: 100, c1 : 'green', c2:'yellow'},
      { x: 'B', y: -40, c1 : 'blue', c2:'yellow' },
      { x: 'C', y: 60, c1 : 'red', c2:'green' }
    ]
  };

  var data2 = {
    color: 'red',
    r : 8,
    data: [
      { x: 'A', y: 150 },
      { x: 'B', y: 50 },
      { x: 'C', y: 30 }
    ]
  };

  var data3 = {
    ir :  -100,
    or : -50,
    data : [
      {x : 200, c : 'blue'},
      {x : 300, c : 'red'},
      {x : 150, c : 'yellow'},
      {x :  50, c : 'green'}
    ]
  };

},3000);