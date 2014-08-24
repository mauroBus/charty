/*global LinearScale: true*/
/**
 * Peak Valley scale for linear axis
 *
 * @class PeakValleyLinearScale
 * @extends BaseScale
 * @requires d3.chart, linearscale, charty, underscore
 *
 * @author "Cesar Del Soldato <cesards@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/peakvalleylinearscale', [
                'd3.chart',
                'charty/linearscale',
                'charty/chartynames',
                'underscore'
            ],
            function(d3, LinearScale, Charty, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, LinearScale, Charty, _);
            });
    } else {
        /** Browser globals */
        root.PeakValleyLinearScale = factory(d3, LinearScale, Charty, _);
    }
}(this, function(d3, LinearScale, Charty, _) {
    /**
     * @constructor
     *
     * @param {Charty.AXIS.X|Charty.AXIS.Y} axisType - X or Y axis setting.
     * @param {Object} [options] - Settings
     *     @param {Boolean} [options.niceDomain=false] - Beautify the domain to include all the possible values.
     */
    var PeakValleyLinearScale = function() {
        LinearScale.apply(this, arguments);
    };

    /**
     * Inheritance from LinearScale
     */
    PeakValleyLinearScale.prototype = new LinearScale();

    /**
     * Calculates the domain for the peak valley linear scale
     *
     * The domain is calculated by adding all the data points one by one
     * and keeping the highest and lowest value it reaches.
     * It sets the domain and the maximum value.
     *
     * @method calculateDomain
     * @chainable
     * @param {Object} data Data collection.
     * @param {Object} iterator Provide a way to access the data
     */
    PeakValleyLinearScale.prototype.calculateDomain = function(data, iterator) {
        var max = 0,
            valley = 0,
            peak = 0,
            series = data.getData(),
            delta = 0;

        if (series && !_.isEmpty(series)) {

            _.each(series, function(element) {
                var data = element.data,
                    sum = 0;

                // Chart can receive no data, should draw nothing or remove
                // already drawn elements
                if (data && !_.isEmpty(data)) {
                    var maxg = d3.max(data, iterator);

                    max = Math.max(maxg, max);

                    // Max and Min after sum all the value from the serie.
                    _.each(data, function(point) {
                        if (point.reset) {
                            sum = 0;
                        }

                        sum = iterator ? sum + iterator(point) : sum + point;

                        if (sum > peak) {
                            peak = sum;
                        } else if (sum < valley) {
                            valley = sum;
                        }
                    });
                }
            }, this);

            if (this.niceDomain) {
                delta = this.getDelta(peak, valley);

                // If no positives are shown, don't use the delta on the peak.
                peak = peak <= 0 ? peak : peak + delta;

                // If no negatives are shown, don't use the delta on the valley.
                valley = valley >= 0 ? valley : valley - delta;
            }

            // Case when there is no data, sometimes can receive a NaN
            if (!_.isNaN(peak) && !_.isNaN(valley) && !_.isNaN(max)) {
                return this.setMaxValue(max).setDomain([
                    Math.min(0, valley),
                    Math.max(0, peak)
                ]);
            }

        }
    };

    return PeakValleyLinearScale;
}));
