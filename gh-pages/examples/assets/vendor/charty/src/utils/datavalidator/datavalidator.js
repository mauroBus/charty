/**
 * Data checker for different data input
 *
 * @class DataValidator
 * @requires d3,
 *           underscore
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/datavalidator', [
                'd3',
                'underscore'
            ],
            function(d3, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(_);
            });
    } else {
        /** Browser globals */
        root.DataValidator = factory(_);
    }
}(this, function(_) {

    /** 
     * Class constructor
     *
     * @constructor
     */
    function DataValidator() {}

    /**
     * Checks if a given value is defined and > 0
     *
     * @method isPositiveNumber
     * @param {Number} value number to check
     * @param {String} message error message to show
     * @return {Number} value
     */
    DataValidator.prototype.isPositiveNumber = function(value, message) {
        if (!_.isUndefined(value) && (!_.isNumber(value) || value < 0)) {
            throw new Error(message);
        }
        return value;
    };

    /**
     * Checks if value is number, or is defined
     *
     * @method isNumber
     * @param {Number} value to check
     * @param {String} error message
     * @return {Number} value
     */
    DataValidator.prototype.isNumber = function(value, message) {
        if (!_.isUndefined(value) && !_.isNumber(value)) {
            throw new Error(message);
        }
        return value;
    };

    /**
     * Checks if a value is defined
     *
     * @method isUndefined
     * @param {Number} value to check
     * @param {String} message error message
     * @return {Number} value
     */
    DataValidator.prototype.isUndefined = function(value, message) {
        if (_.isUndefined(value)) {
            throw new Error(message);
        }
        return value;
    };

    return DataValidator;
}));
