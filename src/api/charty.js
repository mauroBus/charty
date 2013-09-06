/**
Full chart api

@class Charty

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/charty',[
      'charty/chartynames',
      'charty/scalesfactory',
      'charty/chartinterface',
      'charty/datavalidator',
      'charty/barchart',
      'charty/labeledtrianglechart',
      'charty/linechart',
      'charty/scatterplot',
      'charty/donut',
      'charty/donutwithinnertext',
      'charty/linechartcircles'
      ],
      function (Charty, ScaleFactory, ChartInterface, DataValidator) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(Charty, ScaleFactory, ChartInterface, DataValidator);
    });
  }
  else {
    /** Browser globals */
    root.Charty = factory(Charty, ScaleFactory, ChartInterface, DataValidator);
  }
}(this, function (Charty, ScaleFactory, ChartInterface, DataValidator) {

  Charty.scaleFactory = new ScaleFactory();
  Charty.dataValidator = new DataValidator();

  /**
  Appends a chart to a root d3.selection element. Chart is determined
  by a defined chart name.
  Margin is used to translate the chart a small distance. A chart can have many
  instances.
  Whether the chart takes the container dimensions, is it possible to also set
  the dimensions as initial options

  @method
  @param {Object} options options = {
                    chartName : 'BarChart',
                    instances : 2,
                    root : 'body',
                    xAxis : 'ordinal',
                    yAxis : 'linear',
                    xScaleDomain : ['Hi', 'I am', 'a fixed', 'domain']
  @return {Object} d3.chart for data drawing
  */
  Charty.chart = function(options) {

    if (!options.root || !options.chartName) {
      throw new Error('Root element or chart name not defined');
    }

    var selection = d3.select(options.root);

    /**
    Svg element creation

    Sets attributes to provide redimensioning without drawing0
    */
    var svg = selection.append('svg');

    if (options.gradients){
    /** Creation of linear gradients, if defined */
      var defs = svg.append('defs');
      /** Possible to define many gradients for one svg element */
      _.each(options.gradients, function (gradient){
        var grad = defs.append('linearGradient');
            grad.attr('id', gradient.id);

        if (gradient.orientation === 'vertical'){
          /** Vertial orientation */
          grad.attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', 0)
              .attr('y2', 1);
        }

        _.each(gradient.classes, function (gradientClass){
            grad.append('stop')
                .attr( 'class', gradientClass.className)
                .attr('offset', gradientClass.offset);
        });
      });
    }

    /** Append g to svg */
    var gSvg = svg.append('g');

    /**
    Appends the chart to the specified html element.
    */
    var chart = gSvg.chart(options.chartName, {
                    instances: options.instances,
                    dataValidator : this.dataValidator,
                    axisSystem : options.axisSystem,
                    showAsGrid : options.showAsGrid,
                    xAxisLabel : options.xAxisLabel,
                    yAxisLabel : options.yAxisLabel,
                    barType : options.barType
                  });

    /**
    Scale definition.
    Some charts can use direct mapping instead of scaling.
    */
    if (options.xAxis){
      chart = chart.setXScale(this.scaleFactory.scale(options.xAxis,'x'));
    }
    if (options.yAxis){
      chart = chart.setYScale(this.scaleFactory.scale(options.yAxis,'y'));
    }

    /** Sets default x domain */
    if (options.defaultXDomain){
      chart.setDefaultXDomain(options.defaultXDomain);
    }

    /** Sets default y domain */
    if (options.defaultYDomain){
      chart.setDefaultYDomain(options.defaultYDomain);
    }

    /**
    Returns the interface for the chart drawing
    */
    return new ChartInterface(chart, selection, svg, gSvg);
  };

  return Charty;
}));