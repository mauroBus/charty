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

/**
 * Api init for chart creation management.
 *
 *
 * @class ChartsApi
 * @constructor
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {

    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/chartyinit',
            function() {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory();
            });
    } else {
        /** Browser globals */
        root.Charty = factory();
    }
}(this, function() {

    var Charty = {};

    return Charty;
}));

/**
 * Define constants that will be used as names for different parts
 *
 * @class ChartNames
 * @requires chartyinit
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/chartynames', [
                'charty/chartyinit'
            ],
            function(Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(Charty);
            });
    } else {
        /** Browser globals */
        root.Charty = factory(Charty);
    }
}(this, function(Charty) {

    /** Chart / Components / Compositions names */
    Charty.CHART_NAMES = {
        AXIS: 'Axis',
        BAR: 'Bar',
        HORIZONTAL_BAR: 'HorizontalBar',
        WIN_LOSS_BAR: 'WinLossBar',
        BASE_CHART: 'BaseChart',
        CIRCLE: 'Circle',
        DONUT: 'Donut',
        LINE: 'Line',
        ROUNDED_RECTANGLE: 'RoundedRectangle',
        TEXT: 'Text',
        ABOVE_TEXT: 'AboveText',
        RIGHT_TEXT: 'RightText',
        WIN_LOSS_TEXT: 'WinLossText',
        TRIANGLE: 'Triangle',
        XY_AXIS: 'XYAxis',
        YXY_AXIS: 'YXYAxis',
        BAR_CHART: 'BarChart',
        LABELED_TRIANGLE_CHART: 'LabeledTriangleChart',
        SCATTERPLOT: 'Scatterplot',
        MULTIPLE_DATA_GROUP: 'MultipleDataGroup',
        MULTIPLE_INSTANCES_MIXIN: 'MultipleInstancesMixin',
        SIMPLE_DATA_GROUP: 'SimpleDataGroup',
        DONUT_INNER_TEXT: 'DonutWithInnerText',
        GROUPED_BAR_CHART: 'GroupedBarChart',
        LINE_CHART: 'LineChart',
        LINE_CHART_CIRCLES: 'LineChartCircles'
    };

    /**
     * Axis types are defined as constants
     *
     * Related to scaling.
     */
    Charty.AXIS_TYPE = {
        ORDINAL: 'ordinal',
        LINEAR: 'linear',
        PEAK_VALLEY_LINEAR: 'peakValleyLinear'
    };

    /**
     * Axis defined as constants
     */
    Charty.AXIS = {
        X: 'x',
        Y: 'y'
    };

    return Charty;
}));

/**
 *	Defines common scale functionality. Used as base element
 *	for inheritance.
 *
 *	@class BaseScale
 *	@requires d3.chart,
 *						charty
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
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
                 *	is loaded with others */
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
     *	Returns the contained scale.
     *
     *	@method getScale
     *	@return {Object} d3.scale Linear / Ordinal scale
     */
    BaseScale.prototype.getScale = function() {
        return this.scale;
    };

    /**
     *	Generates range value for a scale.
     *
     *	@method generateRange
     *	@param {Number} range value for the range
     *	@return {Number} generated range value
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
     * Class constructor
     *
     * @constructor
     * @param {String} axisType Axis type, defined in Charty names
     */
    var LinearScale = function(axisType) {
        this.scale = d3.scale.linear();
        this.axisType = axisType;
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
        this.scale = this.scale.domain(arrayValues);
        return this;
    };

    /**
     * Sets the range for the linear scale
     *
     * @method setRange
     * @param {Number} range numeric value for linear scale
     * @chainable
     */
    LinearScale.prototype.setRange = function(range) {
        this.scale = this.scale.range(this.generateRange(range));
        return this;
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
     * @param {Object} f callback function
     * @chainable
     */
    LinearScale.prototype.calculateDomain = function(data, f) {
        var max = -Infinity,
            min = Infinity,
            d = data.getData(),
            self = this;

        if (d && !_.isEmpty(d)) {

            _.each(d, function(element) {
                var chartData = element.data;

                /** Chart can receive no data, should draw nothing or remove already drawn elements */
                if (chartData && !_.isEmpty(chartData)) {
                    var maxg = d3.max(chartData, f),
                        ming = d3.min(chartData, f);

                    max = Math.max(maxg, max);
                    min = Math.min(ming, min);
                }

                /** Case when there is no data, sometimes can receive a NaN */
                if (!_.isNaN(max) && !_.isNaN(min)) {
                    return self.setMaxValue(max)
                        .setDomain([Math.min(0, min), Math.max(0, max)]);
                }
            });
        }
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

/* global BaseScale: true */
/**
 *	Ordinal Scale
 *
 *	@class OrdinalScale
 *	@extends BaseScale
 *	@requires d3.chart,
 *						basescale
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
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
                 *	is loaded with others */
                return factory(d3, BaseScale);
            });
    } else {
        /** Browser globals */
        root.OrdinalScale = factory(d3, BaseScale);
    }
}(this, function(d3, BaseScale) {

    /**
     * Class constructor
     *
     *	@constructor
     * @param {String} axisType Axis type, defined in Charty names
     */
    var OrdinalScale = function(axisType) {
        this.scale = d3.scale.ordinal();
        this.axisType = axisType;
    };

    /**
     *	Inheritance from BaseScale
     */
    OrdinalScale.prototype = new BaseScale();

    /**
     *	Sets the domain data for the scale
     *
     *	@method setDomain
     *	@param {Array} domain values for ordinal domain
     *	@chainable
     */
    OrdinalScale.prototype.setDomain = function(domain) {
        this.scale = this.scale.domain(domain);
        return this;
    };

    /**
     *	Sets the range for the scale
     *
     *	@method setRange
     *	@param {Number} range numeric value for the range
     *	@chainable
     */
    OrdinalScale.prototype.setRange = function(range) {
        this.scale = this.scale.rangeRoundBands(this.generateRange(range), 0.1);
        return this;
    };

    /**
     *	Maps a value to the current scaling
     *	Since ordinal scales computes a band width
     *	A value needs to be mapped and moved according
     *	to that band width
     *
     *	@method map
     *	@param {String} value String value that belongs to the domain
     *	@param {Number} factor reduce factor for overlapping charts
     *	@return {Number} mapped String value
     */
    OrdinalScale.prototype.map = function(value, factor) {
        return (this.scale(value) + ((this.scale.rangeBand() - (this.scale.rangeBand() * factor)) / 2));
    };

    /**
     *	Returns the range band for the scale
     *	Can be reduced if (factor < 1)
     *
     *	@method band
     *	@param {Number} factor reduce factor
     *	@return {Number} scale width
     */
    OrdinalScale.prototype.band = function(factor) {
        return (this.scale.rangeBand() * factor);
    };

    /**
     *	Calculates the scale domain, based on a data collection and a
     *	callback function
     *	Regarding the data series, ordinal scales should be uniform, whether
     *	they have values for that specific ordinal element or not.
     *
     *	@method calculateDomain
     *	@param {Object} data Accessor for the data collection
     *	@param {Object} f callback function
     *	@chainable
     */
    OrdinalScale.prototype.calculateDomain = function(data, f) {
        var dataSample = data.first()
            .data,
            dom = dataSample.map(f);

        return this.setDomain(dom);
    };

    /**
     *	Checks if domain wasn't previously calculated
     *
     *	@method defaultDomain
     *	@return {Boolean} True if domain isn't set
     */
    OrdinalScale.prototype.defaultDomain = function() {
        return (this.scale.domain()
            .length === 0);
    };

    return OrdinalScale;
}));

/*global LinearScale: true*/
/**
 * Peak Valley scale for linear axis
 *
 * @class PeakValleyLinearScale
 * @extends BaseScale
 * @requires d3.chart,
 *           linearscale,
 *           charty,
 *           uderscore
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
     * Class constructor
     *
     * @constructor
     * @param {String} axisType Axis type, defined in Charty names
     */
    var PeakValleyLinearScale = function(axisType) {
        this.scale = d3.scale.linear();
        this.axisType = axisType;
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
     * @param {Object} data Accessor for the data collection
     * @param {Object} f callback function
     * @chainable
     */
    PeakValleyLinearScale.prototype.calculateDomain = function(data, f) {
        var max = 0,
            valley = 0,
            peak = 0,
            sum = 0,
            d = data.getData(),
            self = this;

        if (d && !_.isEmpty(d)) {

            _.each(d, function(element) {
                var chartData = element.data;

                /** Chart can receive no data, should draw nothing or remove already drawn elements */
                if (chartData && !_.isEmpty(chartData)) {
                    var maxg = d3.max(chartData, f);
                    max = Math.max(maxg, max);

                    _.each(chartData, function(dataPoint) {

                        if (dataPoint.reset) {
                            sum = 0;
                        }

                        sum = f ? sum + f(dataPoint) : sum + dataPoint;

                        if (sum > peak) {
                            peak = sum;
                        } else if (sum < valley) {
                            valley = sum;
                        }
                    });
                }

                /** Case when there is no data, sometimes can receive a NaN */
                if (!_.isNaN(peak) && !_.isNaN(valley) && !_.isNaN(max)) {
                    return self.setMaxValue(max)
                        .setDomain([valley, peak]);
                }
            });
        }
    };

    return PeakValleyLinearScale;
}));

/* global OrdinalScale: true, LinearScale: true, PeakValleyLinearScale:true */
/**
 *	Scale factory. Separation is provived in an attempt
 *	to provide an easy way to switching scales in a defined chart
 *
 *	@class ScaleFactory
 * @requires d3.chart,
 *						charty,
 *						ordinalscale,
 *						linearscale,
 *						peakvalleylinearscale
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
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
                 *	is loaded with others */
                return factory(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale);
            });
    } else {
        /** Browser globals */
        root.ScaleFactory = factory(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale);
    }
}(this, function(Charty, OrdinalScale, LinearScale, PeakValleyLinearScale) {
    /**
     * Class constructor
     *
     * @constructor
     */
    var ScaleFactory = function() {};

    /**
     *	Returns a specified scale object, acording to a scale type
     *
     *	@method scale
     *	@param {String} scaleType Available scale type
     *	@param {String} axisType Related axis type ('x'-'y')
     *	@return {Object} LinearScale / OrdinalScale
     */
    ScaleFactory.prototype.scale = function(scaleType, axisType) {
        var scale;

        switch (scaleType) {
            case Charty.AXIS_TYPE.ORDINAL:
                scale = new OrdinalScale(axisType);
                break;
            case Charty.AXIS_TYPE.LINEAR:
                scale = new LinearScale(axisType);
                break;
            case Charty.AXIS_TYPE.PEAK_VALLEY_LINEAR:
                scale = new PeakValleyLinearScale(axisType);
                break;
        }

        return scale;
    };

    return ScaleFactory;
}));

/*global LinearScale: true, OrdinalScale: true*/
/**
 * Maps every data point, taking into account one to many
 * scales. Works as a scale composite object.
 *
 * It is possible to requiere more than one scale to map certain
 * elements, so this component will make the correct positioning.
 *
 * Each chart will have two mappers : one for horizontal axis and
 * other for vertical axis.
 *
 * @class DataMapper
 * @requires linearscale,
 *           basescale,
 *           underscore
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/datamapper', [
                'charty/linearscale',
                'charty/ordinalscale',
                'underscore'
            ],
            function(LinearScale, OrdinalScale, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(LinearScale, OrdinalScale, _);
            });
    } else {
        /** Browser globals */
        root.DataMapper = factory(LinearScale, OrdinalScale, _);
    }
}(this, function(LinearScale, OrdinalScale, _) {

    /**
     * Class constructor
     *
     * @constructor
     */
    var DataMapper = function() {
        this.scales = [];
    };

    /**
     * Adds scale for mapping
     *
     * @method addScale
     * @param {BaseScale} scale Scale to add
     * @param {Boolean} setAsBase Defines a scale that will be taken as base
     * @chainable
     */
    DataMapper.prototype.addScale = function(scale, setAsBase) {

        this.baseScale = (setAsBase) ? scale : null;
        this.scales.push(scale);
    };

    /**
     * Returns the defined base scale.
     *
     * @method getBaseScale
     * @returns {BaseScale} Base scale defined
     */
    DataMapper.prototype.getBaseScale = function() {

        return this.baseScale;
    };

    /**
     * Maps a data point, according to the defined scales
     *
     * @method map
     * @param {Object} dataElement Data to be mapped
     * @param {Number} chartFactor Factor that affects some chart's drawing
     * @returns {Number} Data position in SVG canvas.
     */
    DataMapper.prototype.map = function(dataElement, chartFactor) {

        /** Different scales adds some value to the final position */
        var pos = 0;

        _.each(this.scales, function(scale) {
            pos += scale.map(dataElement, chartFactor);
        });

        return pos;
    };

    return DataMapper;

}));

/**
 * Base class for charts
 * Contains common functionality
 *
 * @class BaseChart
 * @requires d3,
 *           underscore,
 *           d3.chart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/basechart', [
                'd3.chart',
                'underscore',
            ],
            function(d3, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, _);
            });
    } else {
        /** Browser globals */
        return factory(d3, _);
    }
}(this, function(d3, _) {

    d3.chart('BaseChart', {
        /**
         * Sets the width for the chart
         * In case chart contains components, width will
         * propagate to them
         *
         * @method width
         * @param {Number} newWidth Width for the chart
         * @chainable
         */
        width: function(newWidth) {

            this.w = newWidth;
            _.each(this._mixins, function(element) {
                element.width(newWidth);
            });

            return this;
        },
        /**
         * Sets the height for the chart. Propagates to
         * components.
         *
         * @method height
         * @param {Number} newHeight Height for the chart
         */
        height: function(newHeight) {

            this.h = newHeight;
            _.each(this._mixins, function(element) {
                element.height(newHeight);
            });

            return this;
        },
        /**
         * Sets the scale type for the x data mapping chart.
         * Propagates to components
         *
         * Not all charts use scales. Some can use direct
         * mapping.
         *
         * @method setXScale
         * @param {Oject} LinearScale, OrdinalScale
         * @chainable
         */
        setXScale: function(scale) {

            this.xscale = scale;
            _.each(this._mixins, function(element) {
                element.setXScale(scale);
            });

            return this;
        },
        /**
         * Sets the scale type for the y data mapping chart.
         * Propagates to components.
         *
         * Not all charts use scales. Some can use direct
         * mapping.
         *
         * @method setYScale
         * @param {Oject} LinearScale, OrdinalScale
         * @chainable
         */
        setYScale: function(scale) {

            this.yscale = scale;
            _.each(this._mixins, function(element) {
                element.setYScale(scale);
            });

            return this;
        },
        /**
         * Propagates the Event Manager to component parts.
         *
         * @method setEventManager
         * @param {EventManager} evtManager Event Manager for chart.
         * @chainable
         */
        setEventManager: function(evtManager) {
            this.eventManager = evtManager;

            _.each(this._mixins, function(mixin) {
                if (mixin.setEventManager) {
                    mixin.setEventManager(evtManager);
                }
            });

            return this;
        }
    });
}));

/**
 * Defines a basic chart to process individual data series
 *
 * @class SimpleDataGroup
 * @extends BaseChart
 * @requires d3.chart,
 *           charty,
 *           basechart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/simpledatagroup', [
                'd3.chart',
                'charty/chartynames',
                'charty/basechart'
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
        .extend(Charty.CHART_NAMES.SIMPLE_DATA_GROUP, {
            /**
             * Returns the next element of the data collection
             *
             * @method transform
             * @param {Object} data Data Accessor
             * @return {Object} next element in the collection
             */
            transform: function(data) {

                return data.next();
            }
        });
}));

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
                this.cssClass = 'axis';

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
                        if (d.data.length) {
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
                            var chart = this.chart(),
                                axis = this.call(chart.axis),
                                xPos = 5,
                                yPos = -2,
                                textAnchor = 'start';

                            if (chart.rotation < 0) {
                                textAnchor = 'end';
                                xPos = -5;
                                yPos = 2;
                            }
                            if (chart.rotation) {
                                this.selectAll('text')
                                    .attr('y', yPos)
                                    .attr('x', xPos)
                                    .style('text-anchor', textAnchor)
                                    .attr('transform', 'rotate(' + chart.rotation + ')');
                            }
                            return axis;
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
                if (newClass) {
                    this.cssClass = newClass;
                }
                return this;
            },
            setRotation: function(degrees) {
                if (degrees) {
                    this.rotation = degrees;
                }
                return this;
            }
        });
}));

/**
 * Bar drawer. Takes only one data series as input.
 *
 * @class Bar
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *           charty,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/bar', [
                'd3.chart',
                'charty/chartynames',
                'charty/simpledatagroup'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others*/
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.BAR, {
            /**
             * Bar initialization
             *
             * @constructor
             * @param {Object} args Arguments for axis component
             */
            initialize: function() {

                /**
                 * Sets only bar color as default.
                 */
                var defaults = {
                    c: 'bar-default'
                };

                var options = {
                    /**
                     * Data bind for a bar serie.
                     * Can have a color set for the whole serie, or
                     * each bar can have an own color defined.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                               color : 'red',
                     *                               data = [
                     *                                {x : 'Jan', y : 200, c : 'blue'}
                     *                               ]
                     *                            }
                     * @chainable
                     */
                    dataBind: function(d) {

                        var chart = this.chart();

                        /**
                         * Sets color for the whole data serie.
                         */
                        chart.c = (d.c || defaults.c);

                        return this.selectAll('rect')
                            .data(d.data);
                    },
                    /**
                     * Inserts a svg:rect element.
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('rect');
                    },
                    events: {
                        /** Events are set, drawing of new elements is handled by merger */
                        'enter': function() {
                            this.chart()
                                .eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {

                            var chart = this.chart(),
                                zeroY = chart.yscale.map(0),
                                heightZeroY = chart.h - zeroY;

                            /**
                             * chart.factor : value used to define bar's width. It can
                             * be useful to reduce the width, in case many data series
                             * are draw using bars.
                             */
                            this.attr('class', function(d) {
                                return (d.c || chart.c);
                            })
                                .attr('x', function(d) {
                                    var pos = 0;
                                    if (chart.zScale) {
                                        pos += chart.zScale.map(d.z, 1);
                                    }
                                    return (pos += chart.xscale.map(d.x, (chart.factor || 1)));
                                })
                                .attr('width', chart.xscale.band(chart.factor || 1))
                                .attr('y', function(d) {
                                    return Math.min(zeroY, chart.yscale.map(d.y, chart.factor));
                                })
                                .attr('height', function(d) {
                                    return Math.abs(chart.yscale.band(chart.h, d.y) - heightZeroY);
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
                this.layer('barlayer', this.base.append('g'), options);
            },
            /**
             * Adds z scale if necessary
             *
             * @method setZScale
             * @param {Object} zScale d3.scale for mapping along x axis. In fact,
             * is the second scale for this axis.
             * @chainable
             */
            setZScale: function(zScale) {
                this.zScale = zScale;
                return this;
            }
        });
}));

/**
 * Bar drawer. Takes only one data series as input.
 * Extends Bar component, since only merge will be redefined.
 *
 * @class HorizontalBar
 * @constructor
 * @extends Bar
 * @requires d3.chart,
 *           charty,
 *           bar
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/horizontalbar', [
                'd3.chart',
                'charty/chartynames',
                'charty/bar'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others*/
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.BAR)
        .extend(Charty.CHART_NAMES.HORIZONTAL_BAR, {
            /**
             * Horizontal bars initialization
             *
             * @constructor
             * @param {Object} args Arguments for horizontal bar component.
             */
            initialize: function() {

                var barLayer = this.layer('barlayer');

                /** Necessary for the way d3.chart handles events */
                barLayer.off('merge');
                barLayer.on('merge', function() {

                    var chart = this.chart(),
                        zeroX = chart.xscale.map(0);

                    this.attr('class', function(d) {
                        return (d.c || chart.c);
                    })
                        .attr("x", function(d) {
                            return chart.xscale.map(Math.min(0, d.x), chart.factor);
                        })
                        .attr("y", function(d) {
                            return chart.yscale.map(d.y, chart.factor);
                        })
                        .attr("width", function(d) {
                            return Math.abs(chart.xscale.map(d.x) - zeroX);
                        })
                        .attr("height", chart.yscale.band(chart.factor));

                    return this;
                });
            }
        });
}));

/**
 * Win Loss Bar drawer. Takes only one data series as input.
 *
 * Win Loss bar data elements allow the following options:
 *
 *  {
 *    x: 'Jan',
 *    y: 200,
 *    c: 'String',
 *    reset: false
 *  }
 *
 * The reset parameter is a boolean that resets the offset of
 *   the graph back to 0.
 *
 * @class WinLossBar
 * @extends Bar
 * @requires d3.chart,
 *           charty,
 *           bar
 *
 * @author "Cesar Del Soldato <cesards@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/winlossbar', [
                'd3.chart',
                'charty/chartynames',
                'charty/simpledatagroup',
                'charty/bar'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others*/
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.BAR)
        .extend(Charty.CHART_NAMES.WIN_LOSS_BAR, {
            /**
             * Win Loss Bar initialization
             *
             * @constructor
             * @param {Object} args Arguments for axis component
             */
            initialize: function() {

                /**
                 * Sets offset for bars.
                 */
                var offset = 0;

                /**
                 * Layers extensions.
                 */
                this.layer('barlayer')
                    .on('merge', function() {

                        var chart = this.chart(),
                            zeroY = chart.yscale.map(0);

                        this.attr('class', function(d) {

                            var customValue = d.c || chart.c || '';

                            if (d.y > 0) {
                                return 'win ' + customValue;
                            } else {
                                return 'loss ' + customValue;
                            }
                            return (d.c || chart.c);
                        })
                            .attr('y', function(d) {
                                var yScaleMap = chart.yscale.map(d.y, chart.factor),
                                    yPos;

                                // Reset the offset if the element asks for it.
                                if (d.reset) {
                                    offset = 0;
                                }

                                yPos = Math.min(zeroY, yScaleMap) + offset;
                                offset = offset + yScaleMap - zeroY;
                                return yPos;
                            });

                        return this;
                    });
            }
        });
}));

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

/**
 * Line drawing.
 *
 * Note : this charts doesn't take events, as it doesn't seem necessary for now.
 *
 * @class Line
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *           charty,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/line', [
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
        .extend(Charty.CHART_NAMES.LINE, {
            /**
             * Line initialization
             *
             * @constructor
             * @param {Object} args Arguments for the line component.
             */
            initialize: function() {

                /**
                 * c : default color line
                 */
                var defaults = {
                    c: 'line-default'
                };

                var line = d3.svg.line();

                var options = {
                    /**
                     * Data bind for a line serie.
                     * Since a line is drawed using d3.line
                     * a datum must be defined. Can also have a color
                     * for the whole serie.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              color : 'redline'
                     *                              data : [
                     *                                {x : 'Jan', y: 200},
                     *                                ...
                     *                              ]
                     *                            }
                     */
                    dataBind: function(d) {

                        var chart = this.chart();

                        line.x(function(d) {
                            return chart.xscale.map(d.x, 0);
                        })
                            .y(function(d) {
                                return chart.yscale.map(d.y, 0);
                            });

                        chart.datum = d.data;
                        chart.c = (d.c || defaults.c);

                        return this.selectAll('path')
                            .data([0]);

                    },
                    /**
                     * Appends a svg:path
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {

                        return this.append('path');
                    },
                    events: {
                        'merge': function() {

                            var chart = this.chart();

                            this.datum(chart.datum)
                                .classed(chart.c, true)
                                .attr('d', line);

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
                this.layer('lineslayer', this.base.append('g'), options);
            }
        });
}));

/**
 * Rounded rectangle drawer.
 *
 * @class RoundedRectangle
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *           charty,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/roundedrectangle', [
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
        // Browser globals
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.ROUNDED_RECTANGLE, {
            /**
             * Rounded rectangle initialization.
             *
             * @constructor
             * @param {Object} args Arguments for rounded rectangles component.
             */
            initialize: function(args) {

                var dataValidator = args.dataValidator,
                    errors = {
                        invalidRH: 'Invalid value for rectangle height. Must be positive number.',
                        invalidRW: 'Invalid value for rectangle width. Must be positive number.',
                        invalidRX: 'Invalid value for rectangle rx. Must be positive number.',
                        invalidRY: 'Invalid value for rectangle ry. Must be positive number.'
                    };

                /**
                 * Defaults for rectangle
                 *
                 * rh : rectangle height
                 * rw : rectangle width
                 * rc : rectangle color
                 * rx, ry : value for rounded corners
                 */
                var defaults = {
                    rh: 20,
                    rw: 20,
                    rc: 'rounded-rectangle-default',
                    rx: 5,
                    ry: 5
                };

                var options = {
                    /**
                     * Data bind for Rounded Rectangle.
                     * Data defines a rectangle height (rh), width (rw),
                     * color (rc), rx, ry. If not defined, defauls are
                     * used.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              rh : 20,
                     *                              rw : 20,
                     *                              rc : 'red'
                     *                              data : [...]
                     *                            }
                     * @chainable
                     */
                    dataBind: function(d) {

                        var chart = this.chart();

                        chart.rh = (dataValidator.isPositiveNumber(d.rh, errors.invalidRH) || defaults.rh);
                        chart.rw = (dataValidator.isPositiveNumber(d.rw, errors.invalidRH) || defaults.rw);
                        chart.rx = (dataValidator.isPositiveNumber(d.rx, errors.invalidRX) || defaults.rx);
                        chart.ry = (dataValidator.isPositiveNumber(d.ry, errors.invalidRY) || defaults.ry);
                        chart.rc = (d.rc || defaults.rc);

                        return this.selectAll('rect')
                            .data(d.data);
                    },
                    /**
                     * Appends a svg:rect element.
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('rect');
                    },
                    events: {
                        'enter': function() {
                            this.chart()
                                .eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {
                            /** Click event only on enter */
                            var chart = this.chart();

                            this.attr('height', chart.rh)
                                .attr('width', chart.rw)
                                .attr('x', function(d) {
                                    return chart.xscale.map(d.x, 1) + (chart.xscale.band(1) / 2) - (chart.rw / 2);
                                })
                                .attr('y', function(d) {
                                    return chart.yscale.map(d.y) - (chart.rh / 2);
                                })
                                .attr('rx', chart.rx)
                                .attr('ry', chart.ry)
                                .attr('class', function(d) {
                                    return (d.rc || chart.rc);
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
                this.layer('roundedrects', this.base, options);
            }
        });
}));

/**
 * Text labeling.
 *
 * @class Text
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *          charty,
 *          simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/text', [
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
        .extend(Charty.CHART_NAMES.TEXT, {
            /**
             * Text label initializator
             *
             * @constructor
             * @param {Object} args Arguments for text component.
             */
            initialize: function() {

                var options = {
                    /**
                     * Data bind for text labeling.
                     * Can depend on other elements, for instance,
                     * the rounded rectangles to form a label.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              data : [...]
                     *                            }
                     */
                    dataBind: function(d) {

                        return this.selectAll('text')
                            .data(d.data);
                    },
                    /**
                     * Insert a svg:text element for each data input.
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('text');
                    },
                    events: {
                        'enter': function() {

                            var chart = this.chart();

                            this.attr('text-anchor', 'middle')
                                .attr('dy', '0.35em');

                            chart.eventManager.bindAll(this);

                            return this;
                        },
                        'merge': function() {

                            var chart = this.chart();

                            this.attr('x', function(d) {
                                return chart.xscale.map(d.x, 1) + (chart.xscale.band(1) / 2);
                            })
                                .attr('y', function(d) {
                                    return chart.yscale.map(d.y);
                                })
                                .text(function(d) {
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
                this.layer('texts', this.base.append('g'), options);
            }
        });
}));

/**
 * Text labeling above the data element. Redefindes "merge"
 * Useful for vertical bar chart
 *
 * @class AboveText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/abovetext', [
                'd3.chart',
                'charty/chartynames',
                'charty/text'
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
    d3.chart(Charty.CHART_NAMES.TEXT)
        .extend(Charty.CHART_NAMES.ABOVE_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for above text component.
             */
            initialize: function() {

                var textLayer = this.layer('texts');

                textLayer.off('merge');
                textLayer.on('merge', function() {

                    var chart = this.chart(),
                        zeroY = chart.yscale.map(0);

                    this.attr('x', function(d) {
                        var pos = 0;
                        if (chart.zScale) {
                            pos += chart.zScale.map(d.z, 1);
                        }

                        return (pos += chart.xscale.map(d.x, (chart.factor || 1)) + (chart.xscale.band(chart.factor || 1) / 2));
                    })
                        .attr('y', function(d) {
                            return Math.min(zeroY, chart.yscale.map(d.y, chart.factor)) - 7;
                        })
                        .text(function(d) {
                            return d.y;
                        });
                });
            }
        });
}));

/**
 * Text labeling right to the data element. Redefindes "merge"
 * Useful for horizonal bar chart
 *
 * @class RightText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/righttext', [
                'd3.chart',
                'charty/chartynames',
                'charty/text'
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
    d3.chart(Charty.CHART_NAMES.TEXT)
        .extend(Charty.CHART_NAMES.RIGHT_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for right text component.
             */
            initialize: function() {

                var textLayer = this.layer('texts');

                textLayer.off('merge');
                textLayer.on('merge', function() {

                    var chart = this.chart();

                    this.attr('x', function(d) {
                        return chart.xscale.map(d.x, chart.factor) + 12;
                    })
                        .attr('y', function(d) {
                            return chart.yscale.map(d.y, chart.factor) + chart.yscale.band(chart.factor || 1) / 2;
                        })
                        .text(function(d) {
                            return d.x;
                        });

                    return this;
                });
            }
        });
}));

/**
 * Text labeling in the middle the data element with Win Loss offser calculation.
 * Redefindes "merge"
 * Useful for vertical bar chart.
 *
 * @class AboveText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Cesar Del Soldato <cesards@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/winlosstext', [
                'd3.chart',
                'charty/chartynames',
                'charty/text'
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
    d3.chart(Charty.CHART_NAMES.TEXT)
        .extend(Charty.CHART_NAMES.WIN_LOSS_TEXT, {
            /**
             * @constructor
             * @param {Object} args Arguments for above text component.
             */
            initialize: function() {

                var textLayer = this.layer('texts');

                /**
                 * Sets offset for label.
                 */
                var offset = 0;

                textLayer.off('merge');
                textLayer.on('merge', function() {

                    var chart = this.chart(),
                        zeroY = chart.yscale.map(0),
                        heightZeroY = chart.h - zeroY;

                    this.attr('x', function(d) {
                        var pos = 0;
                        if (chart.zScale) {
                            pos += chart.zScale.map(d.z, 1);
                        }

                        return (pos += chart.xscale.map(d.x, (chart.factor || 1)) + (chart.xscale.band(chart.factor || 1) / 2));
                    })
                        .attr('y', function(d) {
                            var yScaleMap = chart.yscale.map(d.y, chart.factor),
                                yPos;

                            // Reset the offset if the element asks for it.
                            if (d.reset) {
                                offset = 0;
                            }

                            yPos = yScaleMap + offset + (chart.yscale.band(chart.h, d.y) - heightZeroY) / 2;
                            offset = offset + yScaleMap - zeroY;
                            return yPos;
                        })
                        .text(function(d) {
                            return d.y;
                        });
                });
            }
        });
}));

/**
 * Triangle drawer.
 *
 * @class Triangle
 * @extends SimpleDataGroup
 * @requires d3.chart,
 *           charty,
 *           simpledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/triangle', [
                'd3.chart',
                'charty/chartynames',
                'underscore',
                'charty/simpledatagroup'
            ],
            function(d3, Charty, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, Charty, _);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty, _);
    }
}(this, function(d3, Charty, _) {
    d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.TRIANGLE, {
            /**
             * Triangle initialization
             *
             * @constructor
             * @param {Object} args Arguments for triangle component.
             */
            initialize: function() {

                /**
                 * c : triangle color
                 */
                var defaults = {
                    c: 'triangle-default'
                };

                var options = {
                    /**
                     * Data bind for a triangle serie.
                     * Will set a color for the whole serie.
                     *
                     * @method dataBind
                     * @param {Object} d example = {
                     *                              color : 'red',
                     *                              data : [
                     *                                {x : 'Jun', y : 200 , c:'blue'},
                     *                                ...
                     *                              ]
                     *                            }
                     * @chainable
                     */
                    dataBind: function(d) {

                        var chart = this.chart();

                        chart.c = (d.c || defaults.c);

                        return this.selectAll('path')
                            .data(d.data);

                    },
                    /**
                     * Appends a svg:path
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
                            /** Click event won't be managed here */
                            var chart = this.chart();

                            this.attr('class', function(d) {
                                return (d.c || chart.c);
                            })
                                .attr('d', function(d) {
                                    return chart.getPath(d);
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
                this.layer('triangles', this.base.append('g'), options);
            },
            /**
             * Transform must be redefined in order to
             * separate a triangle in two constituting parts
             *
             * @method transform
             * @param {Object} data Data Acccessor
             * @return {Object} already mapped values for each datapoint
             */
            transform: function(data) {
                var result = [],
                    dataArray = data.next()
                        .data,
                    self = this,
                    xBand = this.xscale.band(1),
                    zeroY = this.yscale.map(0);

                /** Obtains necessary point to draw both paths */
                _.each(dataArray, function(element) {
                    var x1 = self.xscale.map(element.x, 1),
                        x2 = x1 + (xBand / 2),
                        x3 = x1 + xBand,
                        y1 = zeroY,
                        y2 = self.yscale.map(element.y);

                    result.unshift({
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2,
                        x3: x2,
                        y3: y1,
                        c: element.c1,
                        x: element.x,
                        y: element.y
                    });
                    result.unshift({
                        x1: x2,
                        y1: y1,
                        x2: x2,
                        y2: y2,
                        x3: x3,
                        y3: y1,
                        c: element.c2,
                        x: element.x,
                        y: element.y
                    });
                });

                return {
                    data: result,
                    c: data.first()
                        .c
                };
            },
            /**
             * Path is defined as a string connecting different
             * data, visualized as dots.
             *
             * @method getPath
             * @param {Object} d Data point
             * @return {String} path
             */
            getPath: function(d) {
                return ('M ' + d.x1 + ' ' + d.y1 + ' L ' + d.x2 + ' ' + d.y2 + ' L ' + d.x3 + ' ' + d.y3);
            }
        });
}));

/**/
/**
 * Defines a data transformation for composite charts
 *
 * @class MultipleDataGroup
 * @extend BaseChart
 * @requires d3.chart,
 *           charty,
 *           basechart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/multipledatagroup', [
                'd3.chart',
                'charty/chartynames',
                'charty/basechart'
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
        .extend(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP, {
            /**
             * Data transformation for multiple data series.
             *
             * @method tranform
             * @param {Object} data Data accessor
             * @return {Object} Data accesor
             */
            transform: function(data) {

                this._calculateDomains(data);
                return data;
            },
            /**
             * Default domain for x scaling
             *
             * @method setDefaultXDomain
             * @param {Object} domain Array for x domain
             * @chainable
             */
            setDefaultXDomain: function(domain) {
                this.defaultXDomain = domain;
                return this;
            },
            /**
             * Default domain for y scaling
             *
             * @method setDefaultYDomain
             * @param {Object} domain Array for y domain
             * @chainable
             */
            setDefaultYDomain: function(domain) {
                this.defaultYDomain = domain;
                return this;
            },
            /**
             * Domain calculation
             *
             * @method _calculateDomains
             * @param {Object} data Data for domains
             * @param {Object} zScale d3.scale
             */
            _calculateDomains: function(data) {
                /** Default x domain */
                if (this.defaultXDomain) {
                    this.xscale.setDomain(this.defaultXDomain);
                } else {
                    this.xscale.calculateDomain(data, function(d) {
                        return d.x;
                    });
                }

                if (this.zScale) {
                    this.xscale.setRange(this.zScale.band(1));
                } else {
                    this.xscale.setRange(this.w);
                }

                /** Default y domain */
                if (this.defaultYDomain) {
                    this.yscale.setDomain(this.defaultYDomain);
                } else {
                    this.yscale.calculateDomain(data, function(d) {
                        return d.y;
                    });
                }
                this.yscale.setRange(this.h);
            }
        });
}));

/**
 * Chart that can represent many data series
 *
 * @class MultipleInstancesMixin
 * @extends BaseChart
 * @requires d3.chart,
 *           charty,
 *           basechart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/multipleinstancesmixin', [
                'd3.chart',
                'charty/chartynames',
                'charty/basechart'
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
        .extend(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, {

            /**
             * Creates multiple mixin instances of a specific chart.
             * It is necessary to set the instances count
             * and the chart name.
             *
             * @constructor
             * @param {Object} args example = {
             *                                    instances : 2,
             *                                    chartName : 'Bar'
             *                                  }
             */
            initialize: function(args) {

                var f = args.instances;

                this.componentsMixins = [];

                for (var i = args.instances - 1; i >= 0; i--) {

                    var instance = this.mixin(args.chartName,
                        this.base.append('g'),
                        args);

                    instance.factor = ((f--) / args.instances);
                }
            }
        });
}));

/**
 * Base XY system for all the 2D charts.
 *
 * @class XYAxis
 * @requires d3.chart,
 *           charty,
 *           axis
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/xyaxis', [
                'd3.chart',
                'charty/chartynames',
                'charty/axis'
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

    d3.chart(Charty.CHART_NAMES.XY_AXIS, {
        /**
         * XY axis system initializer
         *
         * @constructor
         * @param {Object} args Arguments for xy axis system.
         */
        initialize: function(args) {
            this.xaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                this.base.append('g'),
                args)
                .orient('bottom')
                .setTextLabel(args.xAxisLabel)
                .tickCount(args.xTickCount)
                .tickFormat(args.xAxisTickFormat)
                .setClass(args.xAxisClass)
                .setRotation(args.xAxisTickRotation);

            this.yaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                this.base.append('g'),
                args)
                .orient('left')
                .setTextLabel(args.yAxisLabel, '-90')
                .tickCount(args.yTickCount)
                .tickFormat(args.yAxisTickFormat)
                .setClass(args.yAxisClass)
                .setRotation(args.yAxisTickRotation);

        },
        /**
         * Show whole chart as a grid.
         *
         * @method showAsGrid
         * @chainable
         */
        showAsGrid: function(showAsGrid) {
            this.xaxis.showAsGrid(showAsGrid);
            this.yaxis.showAsGrid(showAsGrid);
            return this;
        },
        /**
         * Moves x axis according to given height value, and sets
         * tick size value.
         *
         * @method height
         * @param {Number} newHeight chart's height
         * @chainable
         */
        height: function(newHeight) {
            this.xaxis.ytranslate(newHeight)
                .tickSize(newHeight);
            this.yaxis.height(newHeight);
            return this;
        },
        /**
         * Sets tick size, based on given width value
         *
         * @method width
         * @param {Number} newWidth chart's width
         * @chainable
         */
        width: function(newWidth) {
            this.yaxis.tickSize(newWidth)
                .width(newWidth);
            this.xaxis.width(newWidth);
            return this;
        },
        /**
         * Sets x scale.
         *
         * @method setXScale
         * @param {Object} scale d3.scale
         * @chainable
         */
        setXScale: function(scale) {
            this.xaxis.setScale(scale);
            return this;
        },
        /**
         * Sets y scale.
         *
         * @method setYScale
         * @param {Object} scale d3.scale
         * @chainable
         */
        setYScale: function(scale) {
            this.yaxis.setScale(scale);
            return this;
        }
    });
}));

/**
 * Defines a YXY axis system.
 * Two Y Axis (one left, one right)
 * One X Axis (bottom).
 *
 * It is built on top of the XY axis system that is already defined.
 *
 * @class YXYAxis
 * @requires d3.chart,
 *          charty,
 *          xyaxis
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/yxyaxis', [
                'd3.chart',
                'charty/chartynames',
                'charty/xyaxis'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        return factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.YXY_AXIS, {
        /**
         * Defines as a mixin a right Y axis, a left Y axis, a X bottom axis
         *
         * @constructor
         * @param {Object} args Arguments for yxy axis system.
         */
        initialize: function(args) {
            this.xyaxis = this.mixin(Charty.CHART_NAMES.XY_AXIS,
                this.base.append('g'),
                args);

            this.yaxisright = this.mixin(Charty.CHART_NAMES.AXIS,
                this.base.append('g'),
                args)
                .orient('right')
                .tickCount(args.yTickCount)
                .tickFormat(args.yAxisTickFormat);

        },
        /**
         * Show whole chart as a grid.
         *
         * @method showAsGrid
         * @chainable
         */
        showAsGrid: function(showAsGrid) {
            this.xyaxis.showAsGrid(showAsGrid);
            return this;
        },
        /**
         * Sets x axis position and tick size
         *
         * @method height
         * @param {Number} newHeight chart's height
         * @chainable
         */
        height: function(newHeight) {
            this.xyaxis.height(newHeight);
            return this;
        },
        /**
         * Sets y axis disposition, based on a given
         * width value, and tick size for only one y axis.
         *
         * @method width
         * @param {Number} newWidth chart's width
         * @chainable
         */
        width: function(newWidth) {
            this.yaxisright.xtranslate(newWidth);
            this.xyaxis.width(newWidth);
            return this;
        },
        /**
         * Redefinition of x scale setter
         *
         * @method setXScale
         * @param {Object} scale d3.scale
         * @chainable
         */
        setXScale: function(scale) {
            this.xyaxis.setXScale(scale);
            return this;
        },
        /**
         * Redefinition of y scale setter
         *
         * @method setYScale
         * @param {Object} scale d3.scale
         * @chainable
         */
        setYScale: function(scale) {
            this.xyaxis.setYScale(scale);
            this.yaxisright.setScale(scale);
            return this;
        }
    });
}));

/**
 * Create a bar chart that will render
 * N data series
 *
 * @class BarChart
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           underscore,
 *           bar,
 *           multipledatagroup,
 *           yxyaxis,
 *           multipleinstancesmixin
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/barchart', [
                'd3.chart',
                'charty/chartynames',
                'underscore',
                'charty/bar',
                'charty/horizontalbar',
                'charty/multipledatagroup',
                'charty/xyaxis',
                'charty/yxyaxis',
                'charty/multipleinstancesmixin',
                'charty/text',
                'charty/abovetext',
                'charty/righttext'
            ],
            function(d3, Charty, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, Charty, _);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty, _);
    }
}(this, function(d3, Charty, _) {

    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.BAR_CHART, {

            /**
             * BarChart initialization.
             *
             * @constructor
             * @param {Object} args example = {
             *                       instances : 2,
             *                       labelType : Charty.CHART_NAMES.ABOVE_TEXT
             *                    }
             */
            initialize: function(args) {

                args.instances = (args.instances || 1);
                args.chartName = args.barType;

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(
                    Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                    this.base.append('g'),
                    args
                );

                /** Optional */
                if (args.labelType) {
                    this.mixin(
                        Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                        this.base.append('g'),
                        // @TODO review extend vs defaults
                        _.extend(args, {
                            chartName: args.labelType
                        })
                    );
                }
            }
        });
}));

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

/**
 * Custom donut chart.
 * Sets a text inside the donut, showing a text label
 * with the represented value.
 *
 * So, this representation will get only one value. The
 * other one must be calculated (rest).
 *
 * The problem can't be solved using mixins, since the text position
 * doesn't depend on the data value.
 *
 * @class DonutWithInnerText
 * @extends Donut
 * @requires d3.chart,
 *           charty,
 *           donut
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/donutwithinnertext', [
                'd3.chart',
                'charty/chartynames',
                'charty/donut'
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

    d3.chart(Charty.CHART_NAMES.DONUT)
        .extend(Charty.CHART_NAMES.DONUT_INNER_TEXT, {

            /** 
             * Constructor
             *
             * @constructor
             * @param {Object} args Arguments for donnut with inner text.
             */
            initialize: function(args) {

                var dataValidator = args.dataValidator,
                    errors = {
                        invalidFontSize: 'Invalid value : font size must be positive'
                    };

                /**
                 * Defaults for Inner text
                 */
                var defaults = {
                    fontSize: 55
                };

                var options = {
                    /**
                     * First element will be shown as label.
                     *
                     * Data here will take two elements, since is necessary
                     * to render two paths for the donut chart.
                     *
                     * The first one is the one that will be shown in label.
                     * The second one is the rest of the donut.
                     *
                     * @method dataBind
                     * @param {Object} data
                     * @chainable
                     */
                    dataBind: function(d) {

                        var chart = this.chart(),
                            data = d.data,
                            stringValue = (data[0].y)
                                .toString() + '%';

                        chart.fontSize = (dataValidator.isPositiveNumber(d.fontSize, errors.invalidFontSize) || defaults.fontSize);
                        /** By default, text will be centered inside donut */
                        chart.xPosition = (d.xPosition || (chart.w / 2));
                        chart.yPosition = (d.yPosition || (chart.h / 2));

                        return this.selectAll('text')
                            .data([stringValue]);
                    },
                    /**
                     * Inserts one text for the value to display
                     *
                     * @method insert
                     * @chainable
                     */
                    insert: function() {
                        return this.append('text');
                    },
                    events: {
                        'enter': function() {

                            var chart = this.chart();

                            this.attr('x', chart.xPosition)
                                .attr('y', chart.yPosition)
                                .attr('dy', '0.35em')
                                .attr('text-anchor', 'middle')
                                .attr('font-size', chart.fontSize)
                                .text(function(d) {
                                    return d;
                                });

                            return this;
                        },
                        'update': function() {

                            this.text(function(d) {
                                return d;
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
                this.layer('donutText', this.base.append('g'), options);
            }
        });
}));

/**
 * Labeled triangle chart drawer.
 *
 * @class LabeledTriangleChart
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           triangle,
 *           roundedrectangle,
 *           textlabel,
 *           multipleinstancesmixin,
 *           yxyaxis,
 *           multipledatagroup
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/labeledtrianglechart', [
                'd3.chart',
                'charty/chartynames',
                'charty/triangle',
                'charty/roundedrectangle',
                'charty/text',
                'charty/multipleinstancesmixin',
                'charty/yxyaxis',
                'charty/multipledatagroup'
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
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.LABELED_TRIANGLE_CHART, {
            /**
             * Labeled triangle constructor.
             *
             * Will contain only one instance of each component chart, since no
             * resize can be assumed.
             *
             * @constructor
             * @param {Object} args Arguments for triangle chart.
             */
            initialize: function(args) {
                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(Charty.CHART_NAMES.TRIANGLE, this.base.append('g'), args);

                this.mixin(Charty.CHART_NAMES.ROUNDED_RECTANGLE, this.base.append('g'), args);

                this.mixin(Charty.CHART_NAMES.TEXT, this.base.append('g'), args);
            }
        });
}));

/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@requires d3.chart,
          charty,
          line,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/linechart', [
                'd3.chart',
                'charty/chartynames',
                'charty/line',
                'charty/multipledatagroup'
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
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.LINE_CHART, {
            /**
             * Multiple data group initializator.
             *
             * Creates N instances of a given mixin.
             *
             * @constructor
             * @param {Object} args N = args.instances
             */
            initialize: function(args) {
                args.chartName = Charty.CHART_NAMES.LINE;
                args.instances = (args.instances || 1);

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(
                    Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                    this.base.append('g'),
                    args
                );
            }
        });
}));

/**
 * Line chart combined with circles. Combines the line chart and
 * the circle component, defining both as mixins.
 *
 * @class LineChartCircles
 * @extends MultipleDataGroup
 * @requires	d3.chart,
 *           charty,
 *           multipledatagroup,
 *           linechart,
 *           multipleinstancesmixin
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/linechartcircles', [
                'd3.chart',
                'charty/chartynames',
                'charty/multipledatagroup',
                'charty/linechart',
                'charty/multipleinstancesmixin'
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
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.LINE_CHART_CIRCLES, {

            /**
             * Line and circles chart initializator.
             *
             * @constructor
             * @param {Object} args example = {
             *                          instances : 2
             *                      }
             */
            initialize: function(args) {
                this.mixin(
                    Charty.CHART_NAMES.LINE_CHART,
                    this.base.append('g'),
                    args
                );

                args.chartName = Charty.CHART_NAMES.CIRCLE;
                args.instances = (args.instances || 1);

                this.mixin(
                    Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                    this.base.append('g'),
                    args
                );
            }
        });
}));

/**
 * Scatterplot chart. Defined combining an axis system and a circles mixin.
 *
 * @class Scatterplot
 * @extends MultipleDataGroup
 * @requires d3.chart,
 *           charty,
 *           circle,
 *           multipledatagroup,
 *           yxyaxis,
 *           multipleinstancesmixin
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/scatterplot', [
                'd3.chart',
                'charty/chartynames',
                'charty/circle',
                'charty/multipledatagroup',
                'charty/yxyaxis',
                'charty/multipleinstancesmixin'
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
    d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
        .extend(Charty.CHART_NAMES.SCATTERPLOT, {

            /**
             * Chart constructor
             *
             * @constructor
             * @param {Object} args Arguments for scatterplot chart.
             */
            initialize: function(args) {

                args.chartName = Charty.CHART_NAMES.CIRCLE;
                args.instances = (args.instances || 1);

                this.mixin(args.axisSystem, this.base.append('g'), args)
                    .showAsGrid(args.showAsGrid);

                this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base, args);
            }
        });
}));

/**
 * Accessor for data collection
 *
 * Accessor will iterate over the data collection.
 *
 * @class Accessor
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/accessor', function() {
            /** Export global even in AMD case in case this script
             * is loaded with others */
            return factory();
        });
    } else {
        /** Browser globals */
        root.Accessor = factory();
    }
}(this, function() {

    /** 
     * Class constructor
     *
     * @constructor
     */
    function Accessor() {
        this.index = -1;
    }

    /**
     * Returns first element of the collection
     *
     * @method first
     * @return {Object} data element from the collection
     */
    Accessor.prototype.first = function() {
        return this.data[0];
    };

    /**
     * Returns the next element of the collection
     * If no more elements are available,
     * collection index will reset itself
     *
     * @method next
     * @return {Object} next element in the collection,
     * first element in case of reset
     */
    Accessor.prototype.next = function() {
        if (!this.hasNext()) {
            this.restart();
        }
        return this.data[++this.index];
    };

    /**
     * Determines if the collection has more elements
     *
     * @method hasNext
     * @return {Boolean} true if collection has more elements,
     * false if not
     */
    Accessor.prototype.hasNext = function() {
        return this.index + 1 < this.data.length;
    };

    /**
     * Resets the colletion to restart iteration automatically
     *
     * @method restart
     * @chainable
     */
    Accessor.prototype.restart = function() {
        this.index = -1;
        return this;
    };

    /**
     * Returns the data contained in the accessor
     *
     * @method getData
     * @return {Object} data collection
     */
    Accessor.prototype.getData = function() {
        return this.data;
    };

    /**
     * Sets a specific data set to this accessor
     *
     * @method setDate
     * @param {Object} data Data series
     * @chainable
     */
    Accessor.prototype.setData = function(data) {
        this.data = data;
        return this;
    };

    return Accessor;
}));

/**
 *	When an event occurs, a defined function will be exectuted.
 *	This is for events that don't depende on an specific API.
 *
 *	@class FunctionEvent
 *	@constructor
 *	@requires d3
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/functionevent', [], function() {
            /**
             * Export global even in AMD case in case this script
             * is loaded with others
             */
            return factory();
        });
    } else {
        /** Browser globals */
        root.FunctionEvent = factory();
    }
}(this, function() {

    /**
     * Class constructor
     *
     * In the execute function, d represents a specific data element
     *
     * @constructor
     * @param {Object} options = {
     *                       on : 'click',
     *                       execute : function (d) {}
     *                       }
     */
    function FunctionEvent(options) {

        this.opts = options;
    }

    /**
     * Binds a function to a specific event
     *
     * @method bind
     * @param {d3.selection} target Target to bind event
     * @chainable
     */
    FunctionEvent.prototype.bind = function(target) {

        target.on(this.opts.on, this.opts.execute);
        return this;
    };

    return FunctionEvent;

}));

/*global $: true*/
/**
 *	Hooks to specified element a bootstrap feature (for instance, a popover).
 *	Since data will be handled a specific way, a custom bootstrap event is given in
 *	order to facilitate instantiation.
 *
 *	Note : since SVG element won't render contained divs, every element will
 *	be added to the 'body' element. This workaround is easier than dealing with
 *	SVG foreing objects.
 *
 *	Supported bootstrap features : popovers, tooltips.
 *
 *	@class BootstrapEvent
 *	@constructor
 *	@requires bootstrap,
 *						underscore,
 *						d3
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support */
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/bootstrapevent', [
            'bootstrap',
            'underscore',
            'd3'
        ], function($, _, d3) {
            /**
             * Export global even in AMD case in case this script
             * is loaded with others
             */
            return factory($, _, d3);
        });
    } else {
        /** Browser globals */
        root.BootstrapEvent = factory($, _, d3);
    }
}(this, function($, _) {

    /**
     *	Class constructor
     *
     *	@constructor
     *	@param Object options example = {
     *																	type : 'popover',
     *																	placement: 'left',
     *																	trigger: 'click',
     *																	content : function () {}
     *																}
     */
    function BootstrapEvent(options) {
        this.opts = options;
    }

    /**
     * Binds the bootstrap feature to a specified target selection
     *
     * @method bind
     * @param  {d3.selection} target Target selection
     * @chainable
     */
    BootstrapEvent.prototype.bind = function(target) {

        var self = this;

        /**
         * Traversing d3 structure to allow jquery bootstrap bindings
         */
        _.each(target[0], function(element) {

            var d3Element = d3.select(element);

            d3Element.attr('data-toggle', self.opts.type);

            /** Bootstrap popover / tooltip instantiation */
            $(element)[self.opts.type]({
                placement: self.opts.placement,
                trigger: self.opts.trigger,
                html: true,
                container: 'body',
                context: d3Element,
                content: function() {
                    return self.opts.content(element);
                }
            });
        });

        return this;
    };

    return BootstrapEvent;
}));

/*global FunctionEvent: true, BootstrapEvent: true*/
/**
 *	Event factory. Creates instances of predefined events objects.
 *
 *	@class EventManager
 *	@constructor
 *	@requires functionevent,
 *						bootstrapevent
 *
 *	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/eventfactory', [
            'charty/functionevent',
            'charty/bootstrapevent',
        ], function(FunctionEvent, BootstrapEvent) {
            /**
             * Export global even in AMD case in case this script
             * is loaded with others
             */
            return factory(FunctionEvent, BootstrapEvent);
        });
    } else {
        /** Browser globals */
        root.EventFactory = factory(FunctionEvent, BootstrapEvent);
    }
}(this, function(FunctionEvent, BootstrapEvent) {

    /**
     *	Class constructor
     *
     * @constructor
     */
    function EventFactory() {

    }

    /**
     *	Creates a specific Charty event object.
     *
     *	@method
     *	@param {Object} e Defined event options
     *	@returns {Event} Charty event
     */
    EventFactory.prototype.createEvent = function(e) {

        var EventObject = null;

        switch (e.type) {
            case 'function':
                EventObject = new FunctionEvent({
                    on: e.evt,
                    execute: e.bind
                });
                break;
            case 'bootstrap':
                EventObject = new BootstrapEvent({
                    trigger: e.evt,
                    type: e.element,
                    content: e.bind,
                    placement: e.placement
                });
                break;
            default:
                break;
        }

        return EventObject;
    };

    return EventFactory;
}));

/*global FunctionEvent: true, BootstrapEvent: true*/
/**
 * Event manager. A simple way of adding multiple events to only one target,
 * if necessary.
 *
 * Since d3 works over selections, a "target" will represent an element selection,
 * so manager won't be working over only one element, but for the collection itself.
 *
 * @class EventManager
 * @constructor
 * @requires functionevent,
 *						bootstrapevent,
 *						underscore
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/eventmanager', [
            'charty/functionevent',
            'charty/bootstrapevent',
            'underscore'
        ], function(FunctionEvent, BootstrapEvent, _) {
            /**
             * Export global even in AMD case in case this script
             * is loaded with others
             */
            return factory(FunctionEvent, BootstrapEvent, _);
        });
    } else {
        /** Browser globals */
        root.EventManager = factory(FunctionEvent, BootstrapEvent, _);
    }
}(this, function(FunctionEvent, BootstrapEvent, _) {

    /**
     * Class constructor
     *
     * @constructor
     */
    function EventManager() {

        this.events = [];
    }

    /**
     * Adds specific defined event to queue
     *
     * @method addEvent
     * @param {Event} e Charty event to bind
     * @chainable
     */
    EventManager.prototype.addEvent = function(e) {

        this.events.push(e);

        return this;
    };

    /**
     * Binds all available events to specified targets.
     *
     * Each event wrapper must have a way to bind itself to the specified
     * elements.
     *
     * @method bindAll
     * @param {d3.selection} t Elements selection
     * @chainable
     */
    EventManager.prototype.bindAll = function(t) {
        _.each(this.events, function(e) {
            e.bind(t);
        });

        return this;
    };

    return EventManager;

}));

/*jshint -W074*/
/*global Accessor: true, EventManager: true, EventFactory: true*/
/**
 * Sets an interface for adding a link between the chart
 * and the data accessor.
 *
 * Uses an event manager for defining different charty events. Since events
 * need to be present when chart is rendered, for attachment to every SVG node,
 * they should be defined by draw method. This makes an easy way of propagating
 * events to each base rendering class.
 *
 * Note : events are NOT defined in chart init, it can happen that, at this point,
 * events handler are not yet defined or they don't have all necessary data.
 *
 * @class ChartInterface
 * @requires accessor,
 *           eventmanager
 *           eventfactory
 *           underscore
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/chartinterface', [
                'charty/accessor',
                'charty/eventmanager',
                'charty/eventfactory',
                'underscore'
            ],
            function(Accessor, EventManager, EventFactory, _) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(Accessor, EventManager, EventFactory, _);
            });
    } else {
        /** Browser globals */
        root.ChartInterface = factory(Accessor, EventManager, EventFactory, _);
    }
}(this, function(Accessor, EventManager, EventFactory, _) {

    /**
     * Class constructor
     *
     * @constructor
     * @param {Object} chart d3.chart object
     * @param {Object} root chart's container
     * @param {Object} svg svg element that contains the chart
     * @param {Object} gSvg g element attached to svg
     * @param {EventFactory} eventFactory Returns instances of Charty events
     */
    var ChartInterface = function(chart, rootSelection, svg, gSvg, eventFactory) {

        this.accessor = new Accessor();

        this.chart = chart;
        this.rootSelection = rootSelection;
        this.svg = svg;
        this.gSvg = gSvg;
        this.eventFactory = eventFactory;
    };

    /**
     * Chart dimensioning via interface. Elements internal dimensioning.
     *
     * @method setDimensions
     * @param {Number} width Drawing space width
     * @param {Number} height Drawing space height
     * @param {Object} margin margin = {
     *                        marginleft = 20,
     *                        margintop = 30,
     *                        marginright = 20,
     *                        marginbottom = 30,
     *                        lfactor = 0.9,
     *                        tfactor = 0.9
     *                      }
     */
    ChartInterface.prototype.setDimensions = function(margin, width, height) {
        /** Defaults margin values */
        var marginValues = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            lfactor: 1,
            tfactor: 1
        };

        /** Values are taken from root element, by parameter or by default */
        var svgHeight = (height || parseInt(this.rootSelection.style('height'), 10) || 200),
            svgWidth = (width || parseInt(this.rootSelection.style('width'), 10) || 200);

        /** svg element dimensioning */
        this.svg.attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('viewBox', ('0 0 ' + svgWidth + " " + svgHeight))
            .attr('preserveAspectRatio', 'XminYmin');

        if (margin) {
            marginValues = {
                left: (margin.marginleft || 0),
                top: (margin.margintop || 0),
                right: (margin.marginright || 0),
                bottom: (margin.marginbottom || 0),
                lfactor: (margin.marginlfactor || 1),
                tfactor: (margin.margintfactor || 1)
            };

            /** Translating g element */
            this.gSvg.attr('transform', 'translate(' + marginValues.left + ',' + marginValues.top + ')');
        }

        /** Calculating values according to margin values */
        svgWidth = (svgWidth - marginValues.right) * marginValues.lfactor;
        svgHeight = (svgHeight - marginValues.bottom) * marginValues.tfactor;

        /** Propagate value to chart*/
        this.chart.height(svgHeight)
            .width(svgWidth);
    };

    /**
     * Interface to the chart drawing stage
     *
     * @method draw
     * @param {Object} dataArray Data series contained in one array
     * @param {Object} eventsArray Events to be attached to data elements
     * @chainable
     */
    ChartInterface.prototype.draw = function(dataArray, eventsArray) {

        var eventManager = new EventManager(),
            self = this;

        /** Adding events to manager */
        _.each(eventsArray, function(e) {
            eventManager.addEvent(self.eventFactory.createEvent(e));
        });

        /** Sets reference in chart for Event Manager */
        this.chart.setEventManager(eventManager);

        this.accessor.setData(dataArray);
        this.chart.draw(this.accessor);

        return this;
    };

    /**
     * Chart redimension, without redrawing elements
     *
     * @method redimension
     * @param {Number} height Value can be forced
     * @param {Number} width Value can be forced
     * @chainable
     */
    ChartInterface.prototype.redimension = function(height, width) {

        var rootHeight = (height || parseInt(this.rootSelection.style('height'), 10)),
            rootWidth = (width || parseInt(this.rootSelection.style('width'), 10)),
            svgHeight = (parseInt(this.svg.style('height'), 10)),
            svgWidth = (parseInt(this.svg.style('width'), 10));

        /** Sets new dimensions and resizing happens */
        if ((rootHeight !== svgHeight) || (rootWidth !== svgWidth)) {

            this.svg.attr('height', rootHeight);
            this.svg.attr('width', rootWidth);
        }

        return this;
    };

    /**
     * Sets a background image via css. Class is required
     *
     * @method setBackgroundImage
     * @param {String} imgClass CSS for the background image
     * @chainable
     */
    ChartInterface.prototype.setBackgroundImage = function(imgClass) {

        this.rootSelection.classed(imgClass, true);
        /** Reference is kept for removing, if necessary */
        this.imgClass = imgClass;

        return this;
    };

    /**
     * Removes class containing background image, if present
     *
     * @method removeBackgroundImage
     * @chainable
     */
    ChartInterface.prototype.removeBackgroundImage = function() {
        this.rootSelection.classed(this.imgClass, false);

        return this;
    };

    /**
     * Sets title as a header
     *
     * @method setTitle
     * @param {String} title Chart title
     * @param {Number} xPosition Position along horizontal axis
     * @param {Number} yPosition Position along vertical axis
     * @chainable
     */
    ChartInterface.prototype.setTitle = function(title, xPosition, yPosition) {

        this.svg.append('text')
            .attr('x', xPosition || 0)
            .attr('y', yPosition || 30)
            .text(title);

        return this;
    };

    return ChartInterface;
}));

/*global Charty: true, ScaleFactory: true, ChartInterface: true, DataValidator: true, EventFactory: true*/
/**
 * Chart instantiation API
 *
 * @class Charty
 * @requires chartynames
 *           scalesfactory
 *           chartinterface
 *           datavalidator
 *           eventfactory
 *           barchart
 *           labeledtrianglechart
 *           linechart
 *           scatterplot
 *           donut
 *           donnutwithinnertext
 *           linechartcircles
 *           groupedbarchart
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */
(function(root, factory) {

    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/charty', [
                'charty/chartynames',
                'charty/scalesfactory',
                'charty/chartinterface',
                'charty/datavalidator',
                'charty/eventfactory',
                'charty/barchart',
                'charty/labeledtrianglechart',
                'charty/linechart',
                'charty/scatterplot',
                'charty/donut',
                'charty/donutwithinnertext',
                'charty/linechartcircles',
                'charty/groupedbarchart',
                'charty/winlossbar',
                'charty/winlosstext'
            ],
            function(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory);
            });
    } else {
        /** Browser globals */
        root.Charty = factory(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory);
    }

}(this, function(Charty, ScaleFactory, ChartInterface, DataValidator, EventFactory) {

    var scaleFactory = new ScaleFactory(),
        dataValidator = new DataValidator(),
        eventFactory = new EventFactory();

    /**
     * Appends a chart to a root d3.selection element. Chart is determined
     * by a defined chart name.
     * Margin is used to translate the chart a small distance. A chart can have many
     * instances.
     * Whether the chart takes the container dimensions, is it possible to also set
     * the dimensions as initial options
     * Defined events will be spread to every chart's component.
     *
     * @method chart
     * @param {Object} options options = {
     *                    chartName : 'BarChart',
     *                    instances : 2,
     *                    root : 'body',
     *                    xAxis : 'ordinal',
     *                    yAxis : 'linear',
     *                    xScaleDomain : ['Hi', 'I am', 'a fixed', 'domain']
     *                  }
     * @return {Object} d3.chart for data drawing
     */
    Charty.chart = function(options) {

        if (!options.root || !options.chartName) {
            throw new Error('Root element or chart name not defined');
        }

        var selection = d3.select(options.root);

        /**
         * Svg element creation
         */
        var svg = selection.append('svg');

        if (options.gradients) {
            /** Creation of linear gradients, if defined */
            var defs = svg.append('defs');
            /** Possible to define many gradients for one svg element */
            _.each(options.gradients, function(gradient) {
                var grad = defs.append('linearGradient');
                grad.attr('id', gradient.id);

                if (gradient.orientation === 'vertical') {
                    /** Vertial orientation */
                    grad.attr('x1', 0)
                        .attr('x2', 0)
                        .attr('y1', 0)
                        .attr('y2', 1);
                }

                _.each(gradient.classes, function(gradientClass) {
                    grad.append('stop')
                        .attr('class', gradientClass.className)
                        .attr('offset', gradientClass.offset);
                });
            });
        }

        /** Append g to svg */
        var gSvg = svg.append('g');

        options.dataValidator = dataValidator;

        /**
         * Appends the chart to the specified html element.
         */
        var chart = gSvg.chart(options.chartName, options);

        /**
         * Scale definition.
         * Some charts can use direct mapping instead of scaling.
         */
        if (options.xAxis) {
            chart.setXScale(scaleFactory.scale(options.xAxis, 'x'));
        }

        if (options.yAxis) {
            chart.setYScale(scaleFactory.scale(options.yAxis, 'y'));
        }

        /** Grouped bar chart uses another scale */
        if (options.zAxis) {
            chart.setZScale(scaleFactory.scale(options.zAxis, 'x'));
        }

        /** Sets default x domain */
        if (options.defaultXDomain) {
            chart.setDefaultXDomain(options.defaultXDomain);
        }

        /** Sets default y domain */
        if (options.defaultYDomain) {
            chart.setDefaultYDomain(options.defaultYDomain);
        }

        /** Sets default z domain */
        if (options.defaultZDomain) {
            chart.setDefaultZDomain(options.defaultZDomain);
        }

        /**
         * Returns the interface for the chart drawing
         *
         * Interface will manage the events creation.
         */
        return new ChartInterface(chart, selection, svg, gSvg, eventFactory);
    };

    return Charty;
}));
