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
                    margin : {
                      left : 20,
                      top : 20,
                      lfactor : 0.8
                      tfactor : 0.8
                    },
                    height : 400,
                    width : 400
  @return {Object} d3.chart for data drawing
  */
  Charty.chart = function(options) {

    if (!options.root || !options.chartName) {
      throw new Error('Root element or chart name not defined');
    }

    var selection = d3.select(options.root),
        height = (parseInt(selection.style('height'), 10) || options.height || 200),
        width  = (parseInt(selection.style('width'), 10) || options.width || 200);

    /**
    Set default values for margin, for the svg element.
    */
    var marginValues = {
      left: (options.marginleft || 0),
      top: (options.margintop || 0),
      lfactor: (options.marginlfactor || 1),
      tfactor: (options.margintfactor || 1)
    };

    /**
    Sets background image via CSS
    */
    if (options.imgLocation){
      selection.classed(options.imgLocation, true);
    }

    /**
    Svg element creation
    */
    var svg = selection.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', ('0 0 '+ width + " " + height))
      .attr('preserveAspectRatio', 'XminYmin');

    /** Append g to svg */
    var gSvg = svg.append('g')
      .attr('transform', 'translate(' + marginValues.left + ',' + marginValues.top + ')');

    /**
    Chart dimension values are porcentaje from svg adapted value.
    */
    width = (width - marginValues.top) * marginValues.lfactor;
    height = (height - marginValues.left) * marginValues.tfactor;

    /**
    Appends the chart to the specified html element.
    */
    var chart = gSvg.chart(options.chartName, {
                    instances: options.instances,
                    dataValidator : this.dataValidator,
                    axisSystem : options.axisSystem,
                    showAsGrid : options.showAsGrid
                  })
                  .height(height)
                  .width(width);

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

    /**
    Returns the interface for the chart drawing
    */
    return new ChartInterface(chart, selection, svg);
  };

  return Charty;
}));