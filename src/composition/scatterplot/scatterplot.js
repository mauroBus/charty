/**
 * Scatterplot chart. Defined combining an axis system and a circles mixin.
 *
 * @class Scatterplot
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           circle,
 *           multipledatagroup,
 *           yxyaxis,
 *           multipleinstancesmixin
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/scatterplot', [
                'd3.chart',
                'charty/chartynames',
                'charty/circle',
                'charty/multipledatagroup',
                'charty/yxyaxis',
                'charty/multipleinstancesmixin',
                'charty/labeledtext'
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
        .extend(Charty.CHART_NAMES.SCATTERPLOT, {

            /**
             * Chart constructor
             *
             * @constructor
             * @param {Object} args Arguments for scatterplot chart.
             */
            initialize: function(args) {
                args.chartName = Charty.CHART_NAMES.CIRCLE;
                args.instances = (args.instances || 1);

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base, args);

                // Applying the multiple data sets also to the "LABELED_TEXT" chart.
                // TODO: Need a refactor of "MULTIPLE_INSTANCES_MIXIN" to allow adding the
                //  data sets to more than one chart.
                args.chartName = Charty.CHART_NAMES.LABELED_TEXT;
                this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base, args);
            }
        });
}));
