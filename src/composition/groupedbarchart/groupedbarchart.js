/*global ScaleFactory: true*/
/**
 * Grouped bar chart.
 * Unlike regular bar char, grouped needs to define
 * two scales for x axis : one for the axis itself, and
 * another one for the data mapping.
 *
 * @class GroupedBarChart
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty/chartynames,
 *           charty/scalesfactory,
 *           charty/bar,
 *           charty/xyaxis,
 *           charty/multipledatagroup,
 *           charty/multipleinstancesmixin
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/groupedbarchart', [
                'd3.chart',
                'charty/scalesfactory',
                'charty/chartynames',
                'charty/bar',
                'charty/xyaxis',
                'charty/multipledatagroup',
                'charty/multipleinstancesmixin',
            ],
            function(d3, ScaleFactory, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, ScaleFactory, Charty);
            });
    } else {
        /** Browser globals */
        return factory(d3, ScaleFactory, Charty);
    }
}(this, function(d3, ScaleFactory, Charty) {
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.GROUPED_BAR_CHART, {

            /**
             * Grouper Bar Chart initializer.
             *
             * @constructor
             * @param {Object} args Arguments for grouped bar chart.
             */
            initialize: function(args) {

                this.axisSystem = this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);
                this.bars = this.mixin(Charty.CHART_NAMES.BAR, this.base.append('g'), args);
            },
            /**
             * It is necessary to rewrite transform data, in order to
             * generate a new scale.
             *
             * Two scales are needed : one for the axis, and another
             * one for bar drawing.
             *
             * @method
             * @param {Object} data Data Accessor
             */
            transform: function(data) {

                // @TODO review this call.
                data.first();

                if (this.defaultZDomain) {
                    this.zScale.setDomain(this.defaultZDomain);
                } else {
                    this.zScale.calculateDomain(data, function(d) {
                        return d.z;
                    });
                }
                this.zScale.setRange(this.w);

                this._calculateDomains(data);

                /** x scale is replaced with z scale */
                this.axisSystem.setXScale(this.zScale);

                /** Adds z scale to bars */
                this.bars.setZScale(this.zScale);

                return data;
            },
            /**
             * Adding new scale for bars grouping
             *
             * @method
             * @param {Object} zScale d3.scale
             * @chainable
             */
            setZScale: function(zScale) {
                if (zScale) {
                    this.zScale = zScale;
                }

                return this;
            },
            /**
             * Default z domain
             *
             * @method
             * @param {Object} zDomain
             * @chainable
             */
            setDefaultZDomain: function(zDomain) {
                this.defaultZDomain = zDomain;
                return this;
            }
        });
}));
