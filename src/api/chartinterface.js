/**
Sets an interface for adding a link between the chart
and the data accessor.

@class ChartInterface
@constructor
@requires accessor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('chartinterface',[
      'accessor'
      ],
      function (Accessor) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(Accessor);
    });
  }
  else {
    /** Browser globals */
    window.ChartInterface = factory(Accessor);
  }
}(this, function (Accessor) {

  /**
  @param {Object} chart d3.chart object
  */
  var ChartInterface = function(chart){
    this.accessor = new Accessor();
    this.chart = chart;
  };

  /**
  Interface to the chart drawing stage

  @method
  @param {Object} dataArray Data series contained in one array
  */
  ChartInterface.prototype.draw = function(dataArray){
    this.accessor.setData(dataArray);
    this.chart.draw(this.accessor);
  };

  return ChartInterface;
}));