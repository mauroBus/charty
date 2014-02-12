/**
 * Text labeling right to the data element. Redefindes "merge"
 * Useful for horizonal bar chart
 *
 * @class RightText
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
        define('charty/righttext', [
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
        .extend(Charty.CHART_NAMES.RIGHT_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for right text component.
             */
            initialize: function() {

                var textLayer = this.layer('texts');

                textLayer.off('merge');
                textLayer.on('merge', function() {

                    var chart = this.chart();

                    this.attr('x', function(d) {
                        return chart.xscale.map(d.x, chart.factor) + 12;
                    })
                        .attr('y', function(d) {
                            return chart.yscale.map(d.y, chart.factor) + chart.yscale.band(chart.factor || 1) / 2;
                        })
                        .text(function(d) {
                            return d.x;
                        });

                    return this;
                });
            }
        });
}));
