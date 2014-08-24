/* global BaseScale: true */
/**
 * Ordinal Scale
 *
 * @class OrdinalScale
 * @extends BaseScale
 * @requires d3.chart, basescale
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/ordinalscale', [
                'd3.chart',
                'charty/basescale',
            ],
            function(d3, BaseScale) {
                /** Export global even in AMD case in case this script
                 *  is loaded with others */
                return factory(d3, BaseScale);
            });
    } else {
        /** Browser globals */
        root.OrdinalScale = factory(d3, BaseScale);
    }
}(this, function(d3, BaseScale) {
    /**
     * @constructor
     *
     * @param {Charty.AXIS.X|Charty.AXIS.Y} axisType - X or Y axis setting.
     * @param {Object} [options] - Settings
     *     @param {Number} [options.spacing=.1] - Spacing between bars.
     */
    var OrdinalScale = function(axisType, options) {
        this.scale = d3.scale.ordinal();
        this.axisType = axisType;
        this.spacing = options && options.spacing || 0.1;
    };

    /**
     *  Inheritance from BaseScale
     */
    OrdinalScale.prototype = new BaseScale();

    /**
     *  Sets the domain data for the scale
     *
     *  @method setDomain
     *  @param {Array} domain values for ordinal domain
     *  @chainable
     */
    OrdinalScale.prototype.setDomain = function(domain) {
        return this.scale = this.scale.domain(domain), this;
    };

    /**
     *  Sets the range for the scale
     *
     *  @method setRange
     *  @param {Number} range numeric value for the range
     *  @chainable
     */
    OrdinalScale.prototype.setRange = function(range) {
        return this.scale = this.scale.rangeRoundBands(this.generateRange(range), this.spacing), this;
    };

    /**
     *  Maps a value to the current scaling
     *  Since ordinal scales computes a band width
     *  A value needs to be mapped and moved according
     *  to that band width
     *
     *  @method map
     *  @param {String} value String value that belongs to the domain
     *  @param {Number} factor reduce factor for overlapping charts
     *  @return {Number} mapped String value
     */
    OrdinalScale.prototype.map = function(value, factor) {
        return (this.scale(value) + ((this.scale.rangeBand() - (this.scale.rangeBand() * factor)) / 2));
    };

    /**
     *  Returns the range band for the scale
     *  Can be reduced if (factor < 1)
     *
     *  @method band
     *  @param {Number} factor reduce factor
     *  @return {Number} scale width
     */
    OrdinalScale.prototype.band = function(factor) {
        return (this.scale.rangeBand() * factor);
    };

    /**
     *  Calculates the scale domain, based on a data collection and a
     *  callback function
     *  Regarding the data series, ordinal scales should be uniform, whether
     *  they have values for that specific ordinal element or not.
     *
     *  @method calculateDomain
     *  @param {Object} data Accessor for the data collection
     *  @param {Object} f callback function
     *  @chainable
     */
    OrdinalScale.prototype.calculateDomain = function(data, f) {
        return this.setDomain(data.first().data.map(f));
    };

    /**
     *  Checks if domain wasn't previously calculated
     *
     *  @method defaultDomain
     *  @return {Boolean} True if domain isn't set
     */
    OrdinalScale.prototype.defaultDomain = function() {
        return this.scale.domain().length === 0;
    };

    return OrdinalScale;
}));
