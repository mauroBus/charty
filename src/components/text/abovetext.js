/**
 * Text labeling above the data element. Redefindes "merge"
 * Useful for vertical bar chart
 *
 * @class AboveText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/abovetext', [
                'd3.chart',
                'charty/chartynames',
                'charty/text'
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
    d3.chart(Charty.CHART_NAMES.TEXT)
        .extend(Charty.CHART_NAMES.ABOVE_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for above text component.
             */
            initialize: function() {

                var textLayer = this.layer('texts');

                textLayer.off('merge');
                textLayer.on('merge', function() {

                    var chart = this.chart(),
                        zeroY = chart.yscale.map(0);

                    this.attr('x', function(d) {
                        var pos = 0;
                        if (chart.zScale) {
                            pos += chart.zScale.map(d.z, 1);
                        }

                        return (pos += chart.xscale.map(d.x, (chart.factor || 1)) + (chart.xscale.band(chart.factor || 1) / 2));
                    })
                        .attr('y', function(d) {
                            return Math.min(zeroY, chart.yscale.map(d.y, chart.factor)) - 7;
                        })
                        .text(function(d) {
                            return d.y;
                        });
                });
            }
        });
}));
