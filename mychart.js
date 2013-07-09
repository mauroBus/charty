//Data structure to render
var data1 = {
  color: 'blue',
  ir :  -100,
  or : -50,
  rh: 20,
  rw: 20,
  rc:'red',
  data: [
    { x: 'A', y: 100 },
    { x: 'B', y: 30 },
    { x: 'C', y: 60 }
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

var datagroup1 = [];
    datagroup1.push(data1);
    datagroup1.push(data2);

var datagroup2 = [];
    datagroup2.push(data1);

var accessor1 = new Accessor(datagroup1);
var accessor2 = new Accessor(datagroup2);

var MyApi = new ChartsApi(); 

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

var chart1 = MyApi.chart(options1);
    chart1.draw(accessor1); 

var chart2 = MyApi.chart(options2); 
    chart2.draw(accessor2);

    data1.color = 'redline';
    data2.color = 'blueline';

var chart3 = MyApi.chart(options3);
    chart3.draw(accessor1); 
