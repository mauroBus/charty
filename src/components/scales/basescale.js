/**
 * Defines common scale functionality. Used as base element for inheritance.
 *
 * @class BaseScale
 * @requires d3.chart, charty
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/basescale', [
                'd3.chart',
                'charty/chartynames'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 *  is loaded with others */
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        root.BaseScale = factory(d3, Charty);
    }
}(this, function(d3, Charty) {

    /**
     * Class constructor
     *
     * @constructor
     */
    var BaseScale = function() {};

    /**
     *  Returns the contained scale.
     *
     *  @method getScale
     *  @return {Object} d3.scale Linear / Ordinal scale
     */
    BaseScale.prototype.getScale = function() {
        return this.scale;
    };

    /**
     *  Generates range value for a scale.
     *
     *  @method generateRange
     *  @param {Number} range value for the range
     *  @return {Number} generated range value
     */
    BaseScale.prototype.generateRange = function(range) {
        var r;

        if (this.axisType === Charty.AXIS.X) {
            r = [0, range];
        } else {
            if (this.axisType === Charty.AXIS.Y) {
                r = [range, 0];
            } else {
                throw new Error('No range was defined for this scale.');
            }
        }

        return r;
    };

    return BaseScale;
}));
