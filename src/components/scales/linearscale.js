/* global BaseScale: true */
/**
 * Linear scale for linear axis
 *
 * @class LinearScale
 * @extends BaseScale
 * @requires d3.chart,
 *           basescale,
 *           uderscore
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/linearscale', [
                'd3.chart',
                'charty/basescale',
                'underscore'
            ],
            function(d3, BaseScale, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, BaseScale, _);
            });
    } else {
        /** Browser globals */
        root.LinearScale = factory(d3, BaseScale, _);
    }
}(this, function(d3, BaseScale, _) {

    /**
     * @constructor
     *
     * @param {Charty.AXIS.X|Charty.AXIS.Y} axisType - X or Y axis setting.
     * @param {Object} [options] - Settings
     *     @param {Boolean} [options.niceDomain=false] - Beautify the domain to include all the possible values.
     */
    var LinearScale = function(axisType, options) {
        this.scale = d3.scale.linear();
        this.axisType = axisType;
        this.niceDomain = options && options.niceDomain || false;
    };

    /**
     * Inheritance from BaseScale
     */
    LinearScale.prototype = new BaseScale();

    /**
     * Sets domain for linear scale
     *
     * @method setDomain
     * @param {Object} arrayValues Max and min value defined by array
     * @chainable
     */
    LinearScale.prototype.setDomain = function(arrayValues) {
        return this.scale.domain(arrayValues).nice(), this;
    };

    /**
     * Sets the range for the linear scale
     *
     * @method setRange
     * @param {Number} range numeric value for linear scale
     * @chainable
     */
    LinearScale.prototype.setRange = function(range) {
        return this.scale.range(this.generateRange(range)), this;
    };

    /**
     * Returns scaled value
     *
     * @method map
     * @param {Number} value number to map to scale
     * @return {Number} mapped value
     */
    LinearScale.prototype.map = function(value) {
        return this.scale(value);
    };

    /**
     * Returns band for a specified value
     *
     * @method band
     * @param {Number} max max value for a scale
     * @param {Number} value to map
     * @return {Number} similar to ordinal band but for
     * linear scale
     */
    LinearScale.prototype.band = function(max, value) {
        return (max - this.scale(value));
    };

    /**
     * Calculates the domain for the linear scale
     *
     * Data probably won't be uniform, so for each data element,
     * a maximum value is obtained. The maximum element will be kept.
     * Same situation is for the minimum element
     *
     * Keeps a reference for the minimum value
     *
     * @method calculateDomain
     * @param {Object} data Accessor for the data collection
     * @param {Object} iterator callback function
     * @chainable
     */
    LinearScale.prototype.calculateDomain = function(data, iterator) {
        var max = -Infinity,
            min = Infinity,
            d = data.getData(),
            delta = 0;

        if (d && !_.isEmpty(d)) {

            _.each(d, function(element) {
                var chartData = element.data;

                /** Chart can receive no data, should draw nothing or remove already drawn elements */
                if (chartData && !_.isEmpty(chartData)) {
                    var maxg = d3.max(chartData, iterator),
                        ming = d3.min(chartData, iterator);

                    max = Math.max(maxg, max);
                    min = Math.min(ming, min);
                }
            }, this);

            if (this.niceDomain) {
                delta = this.getDelta(max, min);
                // If no negative values exist, don't use the delta on the min value.
                min = min >= 0 ? min : min - delta;
            }

            /** Case when there is no data, sometimes can receive a NaN */
            if (!_.isNaN(max) && !_.isNaN(min)) {
                return this.setMaxValue(max)
                    .setDomain([Math.min(0, min), Math.max(0, max + delta)]);
            }

        }
    };

    /**
     * Returns the delta value to add to the domain in order to make sure all the
     * data is wrapped by axis ticks.
     *
     * @method getDelta
     * @param {Number} max The maximum value
     * @param {Number} min The minimum value
     * @return {Number} The delta value calculated on a 10 step division.
     */
    LinearScale.prototype.getDelta = function(max, min) {
        var step = (max - min) / 10 + 1;
        return Math.abs(max - min) % step;
    };

    /**
     * Maximum value setting for linear scale.
     * Useful when setting discrete ticks for continuous scale
     *
     * @method setMaxValue
     * @param {Number} maxVal Scale's maximum value
     * @chainable
     */
    LinearScale.prototype.setMaxValue = function(maxVal) {
        this.maxValue = maxVal;
        return this;
    };

    /**
     * Returns max value
     *
     * @method getMaxValue
     * @return {Number} scale's maximum value
     */
    LinearScale.prototype.getMaxValue = function() {
        return this.maxValue;
    };

    return LinearScale;
}));
