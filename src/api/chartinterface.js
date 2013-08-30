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
    define('charty/chartinterface',[
      'charty/accessor'
      ],
      function (Accessor) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(Accessor);
    });
  }
  else {
    /** Browser globals */
    root.ChartInterface = factory(Accessor);
  }
}(this, function (Accessor) {

  /**
  @param {Object} chart d3.chart object
  @param {Object} root chart's container
  @param {Object} svg svg element that contains the chart
  */
  var ChartInterface = function(chart, rootSelection, svg){
    this.accessor = new Accessor();
    this.chart = chart;
    this.rootSelection = rootSelection;
    this.svg = svg;
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

  /**
  Chart redimension, without redrawing elements

  @method
  @chainable
  */
  ChartInterface.prototype.redimension = function(){

    var rootHeight = (parseInt(this.rootSelection.style('height'), 10)),
        rootWidth  = (parseInt(this.rootSelection.style('width'), 10)),
        svgHeight  = (parseInt(this.svg.style('height'), 10)),
        svgWidth   = (parseInt(this.svg.style('width'), 10));

    /** Sets new dimensions and resizing happens */
    if ((rootHeight !== svgHeight) || (rootWidth !== svgWidth)){

      this.svg.attr('height', rootHeight);
      this.svg.attr('width', rootWidth);
    }

    return this;
  };

  return ChartInterface;
}));