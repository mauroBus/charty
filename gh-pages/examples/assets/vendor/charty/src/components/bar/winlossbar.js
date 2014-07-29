/**
 * Win Loss Bar drawer. Takes only one data series as input.
 *
 * Win Loss bar data elements allow the following options:
 *
 *  {
 *    x: 'Jan',
 *    y: 200,
 *    c: 'String',
 *    reset: false
 *  }
 *
 * The reset parameter is a boolean that resets the offset of
 *   the graph back to 0.
 *
 * @class WinLossBar
 * @extends Bar
 * @requires d3.chart,
 *           charty,
 *           bar
 *
 * @author "Cesar Del Soldato <cesards@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/winlossbar', [
                'd3.chart',
                'charty/chartynames',
                'charty/simpledatagroup',
                'charty/bar'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others*/
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.BAR)
        .extend(Charty.CHART_NAMES.WIN_LOSS_BAR, {
            /**
             * Win Loss Bar initialization
             *
             * @constructor
             * @param {Object} args Arguments for axis component
             */
            initialize: function() {

                /**
                 * Sets offset for bars.
                 */
                var offset = 0;

                /**
                 * Layers extensions.
                 */
                this.layer('barlayer')
                    .on('merge', function() {

                        var chart = this.chart(),
                            zeroY = chart.yscale.map(0);

                        this.attr('class', function(d) {

                            var customValue = d.c || chart.c || '';

                            if (d.y > 0) {
                                return 'win ' + customValue;
                            } else {
                                return 'loss ' + customValue;
                            }
                            return (d.c || chart.c);
                        })
                            .attr('y', function(d) {
                                var yScaleMap = chart.yscale.map(d.y, chart.factor),
                                    yPos;

                                // Reset the offset if the element asks for it.
                                if (d.reset) {
                                    offset = 0;
                                }

                                yPos = Math.min(zeroY, yScaleMap) + offset;
                                offset = offset + yScaleMap - zeroY;
                                return yPos;
                            });

                        return this;
                    });
            }
        });
}));
