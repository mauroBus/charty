/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@requires d3.chart,
          charty,
          line,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/linechart', [
                'd3.chart',
                'charty/chartynames',
                'charty/line',
                'charty/multipledatagroup'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.LINE_CHART, {
            /**
             * Multiple data group initializator.
             *
             * Creates N instances of a given mixin.
             *
             * @constructor
             * @param {Object} args N = args.instances
             */
            initialize: function(args) {
                args.chartName = Charty.CHART_NAMES.LINE;
                args.instances = (args.instances || 1);

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(
                    Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                    this.base.append('g'),
                    args
                );
            }
        });
}));
