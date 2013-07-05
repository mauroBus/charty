
// Describe the container first
var svg = d3.select("body").append("svg");

// data structure
var data = [{
  color: 'bar',
  data: [
    { x: 'A', y: 100 },
    { x: 'B', y: 30 },
    { x: 'C', y: 60 }
  ]
}];

// Use GenericChart as base and extend it, creating a new one with the name
// "MyChart"
d3.chart('GenericChart').extend('MyChart', {

  // chart initializer =~ factory
  initialize: function initialize() {
    this.barChart = this.mixin('MultipleBars', this.base.append('g'), {
      instances: 1
    });
  },

  width: function width(w) {
    // propagate the width to the childs
    this.barChart.width(w);

    return this;
  },

  height: function height(h) {
    this.barChart.height(h);

    return this;
  }

});

// MyChart usage
svg.chart('MyChart')
   .width(350)
   .height(250)
   .draw(new Iterator(data));




