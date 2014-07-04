/**
 * Text labeling in the middle the data element with Win Loss offser calculation.
 * Redefindes "merge"
 * Useful for vertical bar chart.
 *
 * @class AboveText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Cesar Del Soldato <cesards@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/winlosstext', [
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
        .extend(Charty.CHART_NAMES.WIN_LOSS_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for above text component.
             */
            initialize: function() {
                this.offset = 0;
            },

            /**
            Calculate `x` to be centered horizontally.
            **/
            x: function(chart, d) {
                var pos = 0;
                if (chart.zScale) {
                    pos += chart.zScale.map(d.z, 1);
                }

                return (pos += chart.xscale.map(d.x, (chart.factor || 1)) + (chart.xscale.band(chart.factor || 1) / 2));
            },

            /**
            Calculate `y` to be centered vertically.
            **/
            y: function(chart, d) {
                var yScaleMap = chart.yscale.map(d.y, chart.factor),
                    yPos,
                    zeroY = chart.yscale.map(0),
                    heightZeroY = chart.h - zeroY;

                // Reset the offset if the element asks for it.
                if (d.reset) {
                    chart.offset = 0;
                }

                yPos = yScaleMap + chart.offset + (chart.yscale.band(chart.h, d.y) - heightZeroY) / 2;
                chart.offset = chart.offset + yScaleMap - zeroY;
                return yPos;
            }
        });
}));
