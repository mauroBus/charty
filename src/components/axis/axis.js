/**
 * Basic Axis representation.
 *
 * Only one X/Y is sufficient for chart drawing, but can
 * contain more. The idea is to draw an axis and locate it
 * wherever is necessary.
 *
 * Wether Axis is a BaseChart, no need to extend it, since
 * it will implement all the functions needed.
 *
 * @class Axis
 * @requires d3.chart,
 *           charty
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/axis', [
                'd3.chart',
                'charty/chartynames'
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
        .extend(Charty.CHART_NAMES.AXIS, {
            /**
             * Basic Axis initialization
             *
             * @constructor
             * @param {Object} args Arguments for axis component
             */
            initialize: function() {

                /**
                 * Tranlation value in the x direction
                 *
                 * @property xt
                 * @type Number
                 * @default 0
                 */
                this.xt = 0;
                /**
                 * Tranlation value in the y direction
                 *
                 * @property yt
                 * @type Number
                 * @default 0
                 */
                this.yt = 0;

                /**
                 * Axis default CSS class
                 *
                 * @property cssClass
                 * @type String
                 * @default 'axis'
                 */
                this.cssClass= 'axis';

                this.axis = d3.svg.axis();

                /**
                 * Layer options
                 */
                var axisLayerOptions = {
                    /**
                     * Data bind for axis
                     * Since axis requires just a scale, only one element
                     * will be set for the data selection
                     *
                     * @method dataBind
                     * @param {Object} d
                     */
                    dataBind: function(d) {
                        /** Case there is no data to display must be checked */
                        if (d.hasNext()) {
                            return this.selectAll('g')
                                .data([true]);
                        } else {
                            return this.selectAll('g')
                                .data([]);
                        }
                    },

                    /**
                     * Insert for axis. Just inserts one svg:g
                     * element.
                     *
                     * @method insert
                     */
                    insert: function() {
                        return this.append('g');
                    },
                    events: {
                        'enter': function() {

                            var chart = this.chart();

                            /**
                             * Renders as a grid.
                             */
                            if (chart.grid) {
                                chart.axis.tickSize(-chart.tsize, 0, 0);
                            }

                            /** Axis drawing */
                            this.classed(chart.cssClass, true);

                            /**
                             * Axis translation in x or y direction.
                             */
                            if (chart.xt !== 0 || chart.yt !== 0) {
                                this.attr('transform', 'translate(' + chart.xt + ',' + chart.yt + ')');
                            }

                            /** Adds a text label */
                            if (chart.textLabel) {
                                var text = this.append('text')
                                    .text(chart.textLabel);

                                /** Y Axis label rotation */
                                if (chart.labelRotate) {
                                    text.attr('transform', 'translate(' + (-chart.w / 14) + ',' + (chart.h + (chart.textLabel.length * chart.h) / 32) / 2 + ')' +
                                        ' rotate(' + chart.labelRotate + ')');
                                } else {
                                    text.attr('transform', 'translate(' + (chart.w / 2 - chart.textLabel.length * 3.2) + ',' + chart.yt / 6 + ')');
                                }
                            }

                            return this;
                        },
                        'merge': function() {

                            return this.call(this.chart()
                                .axis);
                        },
                        'remove': function() {

                            return this.remove();
                        }
                    }
                };

                /**
                 * Axis layer creation
                 */
                this.layer('axis', this.base.append('g'), axisLayerOptions);
            },
            /**
             * Sets tick size for the axis
             *
             * @method tickSize
             * @param {Number} size ticksize
             * @chainable
             */
            tickSize: function(size) {
                /**
                 * Size for the ticks. Necessary
                 * to define a grid chart.
                 *
                 * @property tsize
                 * @type Number
                 * @default 0
                 */
                this.tsize = (size || 0);
                return this;
            },
            /**
             * Sets the scale that will be used for the axis
             *
             * @method setScale
             * @param {Object} d3.scale
             * @chainable
             */
            setScale: function(scale) {

                if (!scale) {
                    throw new Error('Undefined scale for axis.');
                }

                this.axis.scale(scale.getScale());
                return this;
            },
            /**
             * Shows the axis as a grid
             *
             * @method showAsGrid
             * @param {Boolean} val true/false value
             * @chainable
             * @default false
             */
            showAsGrid: function(val) {
                this.grid = val;
                return this;
            },
            /**
             * Sets axis orientation
             *
             * @method orient
             * @param {String} orient
             * @chainable
             * @default bottom
             */
            orient: function(orient) {

                this.axis.orient(orient || 'bottom');
                return this;
            },
            /**
             * Sets x translation for axis.
             *
             * @method xtranslate
             * @param {Number} t tranlation value
             * @chainable
             */
            xtranslate: function(t) {
                this.xt = t;
                return this;
            },
            /**
             * Sets y translation for axis.
             *
             * @method ytranslate
             * @param {Number} t tranlation value
             * @chainable
             */
            ytranslate: function(t) {
                this.yt = t;
                return this;
            },
            /**
             * Text label that will be set next to the axis
             *
             * @method setTextLabel
             * @param {String} label Text label
             * @param {Number} labelRotate Rotation for y axis label
             * @chainable
             */
            setTextLabel: function(label, labelRotate) {
                this.textLabel = label;
                this.labelRotate = labelRotate;
                return this;
            },
            /**
             * Custom tick count setting for particular
             * axis.
             *
             * This options will only work in linear scales,
             * since the domain, by defaut, is continuous.
             *
             * @method tickCount
             * @param {Number} tCount ticks count
             * @chainable
             */
            tickCount: function(tCount) {
                if (tCount) {
                    this.axis.ticks(tCount);
                }
                return this;
            },
            /**
             * Tick format
             *
             * @method tickFormat
             * @param {String} format Tick format option
             * @chainable
             */
            tickFormat: function(format) {
                if (format) {
                    this.axis.tickFormat(d3.format(format));
                }
                return this;
            },
            setClass: function(newClass) {
                if(newClass) {
                    this.cssClass = newClass;
                }
                return this;
            }
        });
}));
