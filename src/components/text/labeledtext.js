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
        .extend(Charty.CHART_NAMES.LABELED_TEXT, {
            // Select the labels we wish to bind to and
            // bind the data to them.

            x: function(chart, d) {
                return d.label ? chart.xscale.map(d.x, 1) : 0;
            },

            y: function(chart, d) {
                return d.label ? chart.yscale.map(d.y) : 0;
            },

            text: function(d) {
                return d.label ? (d.label.text || '') : '';
            },

            dataBind: function(data) {
                var labels = [];

                _.each(data.data, function(d) {
                    labels = labels.concat(d.data);
                });

                return this.selectAll('text')
                  .data(labels);
            },

            enter: function() {
                // binding the events to the labels.
                this.chart()
                    .eventManager.bindAll(this);
            },

            // merge: function(d) {
            //     var chart = this.chart();

            //     chart.attr('dx', function(d) { // offset x
            //         return (d.label && d.label.text) ? ((d.label.text.toString().length) * -4) : 0;
            //     })
            //     .attr('dy', function(d) { // offset y
            //         return d.label ? (d.label.fontSize || self.labelFontSize) / 2 - 1 : 0;
            //     });
            //         // .text(function(d) { // label text
            //         //     return d.label ? (d.label.text || '') : '';
            //         // })
            //         // .attr('font-size', function(d) { // label font size
            //         //     return d.label ? (d.label.fontSize || self.labelFontSize) : '';
            //         // })
            //         // .attr('style', function(d) { // label fill color
            //         //     return d.label ? ('fill:' + (d.label.color || 'white')) : '';
            //         // });

            //     return this;
            // },

            exit: function() {
                return this.remove();
            }

        });
}));
