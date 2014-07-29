/* global OrdinalScale: true, LinearScale: true, PeakValleyLinearScale: true */
/**
 * Scale factory. Separation is provived in an attempt to provide an easy way
 * to switching scales in a defined chart.
 *
 * @class ScaleFactory
 * @requires d3.chart, charty, ordinalscale, linearscale, peakvalleylinearscale
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/scalesfactory', [
                'charty/chartynames',
                'charty/ordinalscale',
                'charty/linearscale',
                'charty/peakvalleylinearscale'
            ],
            function(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale) {
                /** Export global even in AMD case in case this script
                 *  is loaded with others */
                return factory(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale);
            });
    } else {
        /** Browser globals */
        root.ScaleFactory = factory(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale);
    }
}(this, function(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale) {

    /** @constructor */
    function ScaleFactory() {}

    /**
     * Returns a specified scale object acording to a scale type.
     *
     * @method scale
     *
     * @param {String|Object} options      - List of possible options provided to the scale contructor.
     *   @param {String}  options.name       - Scale type ID.
     *   @param {Number}  options.spacing    - Define how much space we leave between bars (OrdinalScale)
     *   @param {Boolean} options.niceDomain - Ask for a domain proccessing to include all values in the axis (LinearScale)
     *
     * @param {Charty.AXIS.X|Charty.AXIS.Y} axisType - X or Y axis setting.
     *
     * @return {Object} Scale instance.
     */
    ScaleFactory.prototype.scale = function(options, axisType) {
        var type;

        // Retro compatible for type as Strings, since version 0.5.11 we could
        // send options to the scales to be able to configure the object.
        if (_.isString(options)) {
            type = options;
            options = {};
        } else {
            type = options.name;
        }

        switch (type) {
            case Charty.AXIS_TYPE.ORDINAL:
                return new OrdinalScale(axisType, options);
            case Charty.AXIS_TYPE.LINEAR:
                return new LinearScale(axisType, options);
            case Charty.AXIS_TYPE.PEAK_VALLEY_LINEAR:
                return new PeakValleyLinearScale(axisType, options);
            default:
                throw new Error('Provide a value Charty.AXIS_TYPE value');
        }
    };

    return ScaleFactory;
}));
