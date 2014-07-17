/**
 * Text labeling with a custom text. The label is placed in the middle of
 * the data point (x and y).
 *
 * @class LabeledText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Mauro Buselli <maurobuselli@gmail.com>"
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
        .extend(Charty.CHART_NAMES.LABELED_TEXT, {
            // Select the labels we wish to bind to and
            // bind the data to them.

            x: function(chart, d) {
                return d.label ? chart.xscale.map(d.x, 1) : 0;
            },

            y: function(chart, d) {
                return d.label ? chart.yscale.map(d.y) : 0;
            },

            dx: function(chart, d) {
                return (d.label && d.label.text) ? (-(d.label.text.toString().length / 4) + 'em') : 0;
            },

            dy: function(chart, d) {
                return '0.25em';
            },

            text: function(d) {
                return d.label ? (d.label.text || '') : '';
            },

            enter: function() {
                // binding the events to the labels.
                this.chart()
                    .eventManager.bindAll(this);
            },

            exit: function() {
                return this.remove();
            }

        });
}));
