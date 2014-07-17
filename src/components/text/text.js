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

    var Label = {
        /**
         * @constructor
         * Text label initializator
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
                    return this.chart().dataBind.call(this, d);
                },
                /**
                 * Insert a svg:text element for each data input.
                 *
                 * @method insert
                 * @chainable
                 */
                insert: function() {
                    return this.chart().insert.call(this);
                },

                events: {
                    enter: function() {
                        return this.chart().enter.call(this);
                    },

                    merge: function() {
                        return this.chart().merge.call(this);
                    },

                    exit: function() {
                        return this.chart().exit.call(this);
                    }
                }
            };

            /**
             * Layer creation
             */
            this.layer('texts', this.base.append('g'), options);
        },

        /**
        Calculate `x` to be centered horizontally.
        **/
        x: function(chart, d) {
            return chart.xscale.map(d.x, 1) + (chart.xscale.band(1) / 2);
        },

        /**
        Calculate `y` to be centered vertically.
        **/
        y: function(chart, d) {
            return chart.yscale.map(d.y) - 15;
        },

        /**
        Text data accessor.

        @see https://github.com/mbostock/d3/wiki/Selections#wiki-text
        **/
        text: function(d) {
            return d.y;
        },


        /**** Custom Events Data accessor. ****/

        dataBind: function(d) {
            return this.selectAll('text')
                .data(d.data);
        },

        insert: function() {
            return this.append('text');
        },

        enter: function() {
            var chart = this.chart();

            this.attr('text-anchor', 'middle')
                .attr('dy', '0.35em');

            chart.eventManager.bindAll(this);

            return this;
        },

        merge: function() {
            var chart = this.chart();

            this.attr('x', _.partial(chart.x, chart))
                .attr('y', _.partial(chart.y, chart))
                .text(chart.text);

            return this;
        },

        exit: function() {
            return this.remove();
        }
    };

    d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.TEXT, Label);
}));
