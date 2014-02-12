/*global Charty: true, ScaleFactory: true, ChartInterface: true, DataValidator: true, EventFactory: true*/
/**
 * Chart instantiation API
 *
 * @class Charty
 * @requires chartynames
 *           scalesfactory
 *           chartinterface
 *           datavalidator
 *           eventfactory
 *           barchart
 *           labeledtrianglechart
 *           linechart
 *           scatterplot
 *           donut
 *           donnutwithinnertext
 *           linechartcircles
 *           groupedbarchart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {

    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/charty', [
                'charty/chartynames',
                'charty/scalesfactory',
                'charty/chartinterface',
                'charty/datavalidator',
                'charty/eventfactory',
                'charty/barchart',
                'charty/labeledtrianglechart',
                'charty/linechart',
                'charty/scatterplot',
                'charty/donut',
                'charty/donutwithinnertext',
                'charty/linechartcircles',
                'charty/groupedbarchart',
                'charty/winlossbar',
                'charty/winlosstext'
            ],
            function(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory);
            });
    } else {
        /** Browser globals */
        root.Charty = factory(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory);
    }

}(this, function(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory) {

    var scaleFactory = new ScaleFactory(),
        dataValidator = new DataValidator(),
        eventFactory = new EventFactory();

    /**
     * Appends a chart to a root d3.selection element. Chart is determined
     * by a defined chart name.
     * Margin is used to translate the chart a small distance. A chart can have many
     * instances.
     * Whether the chart takes the container dimensions, is it possible to also set
     * the dimensions as initial options
     * Defined events will be spread to every chart's component.
     *
     * @method chart
     * @param {Object} options options = {
     *                    chartName : 'BarChart',
     *                    instances : 2,
     *                    root : 'body',
     *                    xAxis : 'ordinal',
     *                    yAxis : 'linear',
     *                    xScaleDomain : ['Hi', 'I am', 'a fixed', 'domain']
     *                  }
     * @return {Object} d3.chart for data drawing
     */
    Charty.chart = function(options) {

        if (!options.root || !options.chartName) {
            throw new Error('Root element or chart name not defined');
        }

        var selection = d3.select(options.root);

        /**
         * Svg element creation
         */
        var svg = selection.append('svg');

        if (options.gradients) {
            /** Creation of linear gradients, if defined */
            var defs = svg.append('defs');
            /** Possible to define many gradients for one svg element */
            _.each(options.gradients, function(gradient) {
                var grad = defs.append('linearGradient');
                grad.attr('id', gradient.id);

                if (gradient.orientation === 'vertical') {
                    /** Vertial orientation */
                    grad.attr('x1', 0)
                        .attr('x2', 0)
                        .attr('y1', 0)
                        .attr('y2', 1);
                }

                _.each(gradient.classes, function(gradientClass) {
                    grad.append('stop')
                        .attr('class', gradientClass.className)
                        .attr('offset', gradientClass.offset);
                });
            });
        }

        /** Append g to svg */
        var gSvg = svg.append('g');

        options.dataValidator = dataValidator;

        /**
         * Appends the chart to the specified html element.
         */
        var chart = gSvg.chart(options.chartName, options);

        /**
         * Scale definition.
         * Some charts can use direct mapping instead of scaling.
         */
        if (options.xAxis) {
            chart.setXScale(scaleFactory.scale(options.xAxis, 'x'));
        }

        if (options.yAxis) {
            chart.setYScale(scaleFactory.scale(options.yAxis, 'y'));
        }

        /** Grouped bar chart uses another scale */
        if (options.zAxis) {
            chart.setZScale(scaleFactory.scale(options.zAxis, 'x'));
        }

        /** Sets default x domain */
        if (options.defaultXDomain) {
            chart.setDefaultXDomain(options.defaultXDomain);
        }

        /** Sets default y domain */
        if (options.defaultYDomain) {
            chart.setDefaultYDomain(options.defaultYDomain);
        }

        /** Sets default z domain */
        if (options.defaultZDomain) {
            chart.setDefaultZDomain(options.defaultZDomain);
        }

        /**
         * Returns the interface for the chart drawing
         *
         * Interface will manage the events creation.
         */
        return new ChartInterface(chart, selection, svg, gSvg, eventFactory);
    };

    return Charty;
}));
