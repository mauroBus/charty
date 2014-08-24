/**
 * Labeled triangle chart drawer.
 *
 * @class LabeledTriangleChart
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           triangle,
 *           roundedrectangle,
 *           textlabel,
 *           multipleinstancesmixin,
 *           yxyaxis,
 *           multipledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/labeledtrianglechart', [
                'd3.chart',
                'charty/chartynames',
                'charty/triangle',
                'charty/roundedrectangle',
                'charty/text',
                'charty/multipleinstancesmixin',
                'charty/yxyaxis',
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
        .extend(Charty.CHART_NAMES.LABELED_TRIANGLE_CHART, {
            /**
             * Labeled triangle constructor.
             *
             * Will contain only one instance of each component chart, since no
             * resize can be assumed.
             *
             * @constructor
             * @param {Object} args Arguments for triangle chart.
             */
            initialize: function(args) {
                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(Charty.CHART_NAMES.TRIANGLE, this.base.append('g'), args);

                this.mixin(Charty.CHART_NAMES.ROUNDED_RECTANGLE, this.base.append('g'), args);

                this.mixin(Charty.CHART_NAMES.TEXT, this.base.append('g'), args);
            }
        });
}));
