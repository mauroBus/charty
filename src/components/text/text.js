/**
 * Text labeling.
 *
 * @class Text
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *          charty,
 *          simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/text', [
                'd3.chart',
                'charty/chartynames',
                'charty/simpledatagroup'
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
    d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.TEXT, {
            /**
             * Text label initializator
             *
             * @constructor
             * @param {Object} args Arguments for text component.
             */
            initialize: function() {

                var options = {
                    /**
                     * Data bind for text labeling.
                     * Can depend on other elements, for instance,
                     * the rounded rectangles to form a label.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              data : [...]
                     *                            }
                     */
                    dataBind: function(d) {

                        return this.selectAll('text')
                            .data(d.data);
                    },
                    /**
                     * Insert a svg:text element for each data input.
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('text');
                    },
                    events: {
                        'enter': function() {

                            var chart = this.chart();

                            this.attr('text-anchor', 'middle')
                                .attr('dy', '0.35em');

                            chart.eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {

                            var chart = this.chart();

                            this.attr('x', function(d) {
                                return chart.xscale.map(d.x, 1) + (chart.xscale.band(1) / 2);
                            })
                                .attr('y', function(d) {
                                    return chart.yscale.map(d.y);
                                })
                                .text(function(d) {
                                    return d.y;
                                });

                            return this;
                        },
                        'exit': function() {

                            return this.remove();
                        }
                    }
                };

                /**
                 * Layer creation
                 */
                this.layer('texts', this.base.append('g'), options);
            }
        });
}));
