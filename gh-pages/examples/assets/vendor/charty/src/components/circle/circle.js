/**
 * Circle drawer.
 *
 * @class Circle
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *           underscore,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/circle', [
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
        .extend(Charty.CHART_NAMES.CIRCLE, {
            /**
             * Circle initializator
             *
             * @constructor
             * @param {Object} args Arguments for the circle component.
             */
            initialize: function(args) {

                var dataValidator = args.dataValidator,
                    errors = {
                        invalidRadio: 'Invalid value : radius for circles must be positive.'
                    };

                /**
                 * Defaults for circles.
                 *
                 * r : circle radius
                 * c : circle color
                 */
                var defaults = {
                    r: 5,
                    c: 'circle-default'
                };

                var options = {
                    /**
                     * Data bind for a circle serie.
                     * Can have color and circle radius set for the whole serie,
                     * or own values for each data point.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              color : 'red',
                     *                              r : 5
                     *                              data : [
                     *                                {x : 'Jan', y: 300, c : 'blue', r : 20}
                     *                              ]
                     *                            }
                     * @chainable
                     */
                    dataBind: function(d) {

                        var chart = this.chart();

                        chart.c = (d.c || defaults.c);
                        chart.r = (dataValidator.isPositiveNumber(d.r, errors.invalidRadio) || defaults.r);

                        return this.selectAll('circle')
                            .data(d.data);
                    },
                    /**
                     * Appends a svg:circle
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('circle');
                    },
                    events: {
                        'enter': function() {
                            this.chart()
                                .eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {
                            /** No click event handled on update */
                            var chart = this.chart();

                            this.attr('class', function(d) {
                                return (d.c || chart.c);
                            })
                                .attr("r", function(d) {
                                    return (d.r || chart.r);
                                })
                                .attr('cx', function(d) {
                                    return chart.xscale.map(d.x, 0);
                                })
                                .attr('cy', function(d) {
                                    return chart.yscale.map(d.y, 0);
                                })
                                .attr('dx', function(d) {
                                    return d.x;
                                })
                                .attr('dy', function(d) {
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
                this.layer('circles', this.base.append('g'), options);
            }
        });
}));
