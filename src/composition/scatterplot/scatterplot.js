/**
 * Scatterplot chart. Defined combining an axis system and a circles mixin.
 *
 * @class Scatterplot
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           circle,
 *           multipledatagroup,
 *           yxyaxis,
 *           multipleinstancesmixin
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/scatterplot', [
                'd3.chart',
                'charty/chartynames',
                'charty/circle',
                'charty/multipledatagroup',
                'charty/yxyaxis',
                'charty/multipleinstancesmixin'
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
        .extend(Charty.CHART_NAMES.SCATTERPLOT, {

            labelFontSize: 12,

            /**
             * Chart constructor
             *
             * @constructor
             * @param {Object} args Arguments for scatterplot chart.
             */
            initialize: function(args) {
                args.chartName = Charty.CHART_NAMES.CIRCLE;
                args.instances = (args.instances || 1);

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base, args);

                this.layer('labels', this.base.append('g'), this.getLabelsLayer());
            },

            /**
             * getLabelsLayer Creates the layer of labels for each circle in the chart.
             * @return {Object} The layer of labels for each circle in the chart.
             * @todo  Maybe it's better to send it to a new graph, althought I couldn't
             *        get it work with the "mixin" way to extend from charts like "text" type.
             */
            getLabelsLayer: function() {
                var self = this;

                return {
                    // Select the labels we wish to bind to and
                    // bind the data to them.
                    dataBind: function(data) {
                        var labels = [];

                        _.each(data.data, function(d) {
                            labels = labels.concat(d.data);
                        });

                        return this.selectAll('text')
                          .data(labels);
                    },

                    // insert the texts for the circle labels
                    insert: function(d) {
                        return this.append('text');
                    },

                    // define lifecycle events
                    events: {
                        enter: function() {
                            // binding the events to the labels.
                            this.chart()
                                .eventManager.bindAll(this);
                        },

                        merge: function(d) {
                            var chart = this.chart();

                            this.attr('x', function(d) {
                                    return d.label ? chart.xscale.map(d.x, 1) : 0;
                                })
                                .attr('y', function(d) {
                                    return d.label ? chart.yscale.map(d.y) : 0;
                                })
                                .attr('dx', function(d) { // offset x
                                    return (d.label && d.label.text) ? ((d.label.text.toString().length) * -4) : 0;
                                })
                                .attr('dy', function(d) { // offset y
                                    return d.label ? (d.label.fontSize || self.labelFontSize) / 2 - 1 : 0;
                                })
                                .text(function(d) { // label text
                                    return d.label ? (d.label.text || '') : '';
                                })
                                .attr('font-size', function(d) { // label font size
                                    return d.label ? (d.label.fontSize || self.labelFontSize) : '';
                                })
                                .attr('style', function(d) { // label fill color
                                    return d.label ? ('fill:' + (d.label.color || 'white')) : '';
                                });

                            return this;
                        },

                        exit: function() {
                            return this.remove();
                        }
                    } // end of events.
                }; // end of return
            }
        });
}));
