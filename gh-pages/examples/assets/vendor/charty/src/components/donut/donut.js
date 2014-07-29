/**
 * Donut drawer.
 *
 * @class Donut
 * @extends SimpleDataGroup
 * @requires d3,
 *           underscore,
 *           d3.chart,
 *           charty,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/donut', [
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
        .extend(Charty.CHART_NAMES.DONUT, {
            /**
             * Donut initialization
             *
             * @constructor
             * @param {Object} args Arguments for the donut chart.
             */
            initialize: function(args) {

                var dataValidator = args.dataValidator,
                    errors = {
                        invalidRadius: 'Radius for donut chart must be numerical values'
                    };

                /**
                 * ir : inner radius
                 * or : outter radius
                 */
                var defaults = {
                    ir: 90,
                    or: 50
                };

                /**
                 * d3 layout for pie data mapping.
                 */
                var pieLayout = d3.layout
                    .pie()
                    .sort(null)
                    .value(function(d) {
                        return d.y;
                    });

                var arcGen = d3.svg.arc();

                var options = {
                    /**
                     * Data bind for donut.
                     * Will take x elements as data for drawing
                     * or : outter radius
                     * ir : inner radius
                     * Each part of the donut must have a color set
                     *
                     * @method dataBind
                     * @param {Object} data example = {
                     *                                  ir : 150,
                     *                                  or : 100,
                     *                                  xPosition : 100,
                     *                                  yPosition : 100,
                     *                                  data : [
                     *                                    {x : 200, c: 'red' }
                     *                                    {x : 500, c: 'blue'}
                     *                                  ]
                     *                                }
                     */
                    dataBind: function(data) {

                        var chart = this.chart();

                        /** By default, donut will be centered in svg */
                        chart.xPosition = (data.xPosition || (chart.w / 2));
                        chart.yPosition = (data.yPosition || (chart.h / 2));

                        /** Radius definition */
                        var ir = (dataValidator.isNumber(data.ir, errors.invalidRadius) || defaults.ir),
                            or = (dataValidator.isNumber(data.or, errors.invalidRadius) || defaults.or);

                        arcGen = arcGen.innerRadius(ir)
                            .outerRadius(or);

                        return this.selectAll('path')
                            .data(pieLayout(data.data));
                    },
                    /**
                     * Adds a svg:path element for the donut
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('path');
                    },
                    events: {
                        'enter': function() {
                            this.chart()
                                .eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {

                            var chart = this.chart();

                            /** No click event is considered, it should be added on enter */
                            this.attr('transform', 'translate(' + (chart.xPosition) + ',' + (chart.yPosition) + ')')
                                .attr('class', function(d) {

                                    return d.data.c;
                                })
                                .attr('d', arcGen);

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
                this.layer('paths', this.base.append('g'), options);
            }
        });
}));
