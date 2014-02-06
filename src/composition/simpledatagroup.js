/**
 * Defines a basic chart to process individual data series
 *
 * @class SimpleDataGroup
 * @extends BaseChart
 * @requires d3.chart,
 *           charty,
 *           basechart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/simpledatagroup', [
                'd3.chart',
                'charty/chartynames',
                'charty/basechart'
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

    d3.chart(Charty.CHART_NAMES.BASE_CHART)
        .extend(Charty.CHART_NAMES.SIMPLE_DATA_GROUP, {
            /**
             * Returns the next element of the data collection
             *
             * @method transform
             * @param {Object} data Data Accessor
             * @return {Object} next element in the collection
             */
            transform: function(data) {

                return data.next();
            }
        });
}));
