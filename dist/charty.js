/**
Data checker for different data input

@class DataValidator
@constructor
@requires underscore

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/datavalidator',[
      'underscore'
      ],
      function (_) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(_);
    });
  }
  else {
    /** Browser globals */
    root.DataValidator = factory(_);
  }
}(this, function() {
  function DataValidator (_){

  }

  /**
  Checks if a given value is defined and > 0

  @method
  @param {Number} value number to check
  @param {String} message error message to show
  @return {Number} value
  */
  DataValidator.prototype.isPositiveNumber = function (value, message){
    if(!_.isUndefined(value) && (!_.isNumber(value) || value < 0)){
      throw new Error(message);
    }
    return value;
  };

  /**
  Checks if value is number, or is defined

  @method
  @param {Number} value to check
  @param {String} error message
  @return {Number} value
  */
  DataValidator.prototype.isNumber = function(value, message){
    if(!_.isUndefined(value) && !_.isNumber(value)){
      throw new Error(message);
    }
    return value;
  };

  /**
  Checks if a value is defined

  @method
  @param {Number} value to check
  @param {String} message error message
  @return {Number} value
  */
  DataValidator.prototype.isUndefined = function(value, message){
    if(_.isUndefined(value)){
      throw new Error(message);
    }
    return value;
  };

  return DataValidator;
}));
/**
Api for chart creation management.

Having the api, it is possible to set a root html element,
and it will append a specific chart to it.

@class ChartsApi
@constructor
@requires d3.chart,
          scalesfactory,
          barchart,
          labeledtrianglechart,
          linechart,
          scatterplot,
          donut,
          donutwithinnertext,
          labeleddonutchart,
          linechartcircles

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {

  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/chartyinit',
      function () {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory();
      });
  } else {
    /** Browser globals */
    root.Charty = factory();
  }
}(this, function () {

  var Charty = {

  };

  return Charty;
}));
/**
Define constants that will be used as names for different parts

@class ChartNames

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/chartynames',[
      'charty/chartyinit'
      ],
      function (Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(Charty);
    });
  }
  else {
    /** Browser globals */
    root.Charty = factory(Charty);
  }
}(this, function (Charty) {

  Charty.CHART_NAMES = {
    AXIS: 'Axis',
    BAR: 'Bar',
    BASE_CHART: 'BaseChart',
    CIRCLE: 'Circle',
    DONUT: 'Donut',
    LINE: 'Line',
    ROUNDED_RECTANGLE: 'RoundedRectangle',
    TEXT: 'Text',
    TRIANGLE: 'Triangle',
    XY_AXIS: 'XYAxis',
    YXY_AXIS: 'YXYAxis',
    BAR_CHART: 'BarChart',
    LABELED_TRIANGLE_CHART: 'LabeledTriangleChart',
    SCATTERPLOT: 'Scatterplot',
    MULTIPLE_DATA_GROUP: 'MultipleDataGroup',
    MULTIPLE_INSTANCES_MIXIN: 'MultipleInstancesMixin',
    SIMPLE_DATA_GROUP: 'SimpleDataGroup',
    DONUT_INNER_TEXT : 'DonutWithInnerText',
    GROUPED_BAR_CHART : 'GroupedBarChart',
    LINE_CHART : 'LineChart',
    LINE_CHART_CIRCLES : 'LineChartCircles'
  };

  /**
  Axis types are defined as constants
  */
  Charty.AXIS_TYPE = {
    ORDINAL: 'ordinal',
    LINEAR: 'linear'
  };

  /**
  Axis defined as constants
  */
  Charty.AXIS = {
    X : 'x',
    Y : 'y'
  };

  return Charty;
}));
/**
Defines common scale functionality. Used as base element
for inheritance.

@class BaseScale
@requires d3.chart,
          charty

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/basescale',[
      'd3.chart',
      'charty/chartynames'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    window.BaseScale = factory(d3, Charty);
  }
}(this, function (d3, Charty) {

	var BaseScale = function(){

	};

	/**
	Returns the created scale

	@method
	@return {Object} d3.scale Linear / Ordinal scale
	*/
	BaseScale.prototype.getScale = function(){
		return this.scale;
	};

	/**
	Generates range value for a scale.

	@method
	@param {Number} range value for the range
	@return {Number} generated range value
	*/
	BaseScale.prototype.generateRange = function(range){
		var r ;

		if(this.axisType === Charty.AXIS.X){
			r = [0,range];
		}
		else{
			if(this.axisType === Charty.AXIS.Y){
				r = [range,0];
			}
			else{
				throw new Error('No scale was defined for this scale.');
			}
		}

		return r;
	};

	return BaseScale;
}));
/**
Linear scale for linear axis

@class LinearScale
@constructor
@extends BaseScale
@requires d3.chart,
					basescale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/linearscale',[
			'd3.chart',
			'charty/basescale'
			],
			function (d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    window.LinearScale = factory(d3, BaseScale);
  }
}(this, function (d3, BaseScale) {

	var LinearScale = function(axisType){
		this.scale = d3.scale.linear();
		this.axisType = axisType;
	};

	/**
	Inheritance from BaseScale
	*/
	LinearScale.prototype = new BaseScale();

	/**
	Sets domain for linear scale

	@method
	@param {Number} minValue minimum value for scale
	@param {Number} maxValue maximum value for scale
	@chainable
	*/
	LinearScale.prototype.setDomain = function(minValue, maxValue){
		this.scale = this.scale.domain([minValue, maxValue]);
		return this;
	};

	/**
	Sets the range for the linear scale

	@method
	@param {Number} range numeric value for linear scale
	@chainable
	*/
	LinearScale.prototype.setRange = function(range){

		this.scale = this.scale.range(this.generateRange(range));
		return this;
	};

	/**
	Returns scaled value

	@method
	@param {Number} value number to map to scale
	@return {Number} mapped value
	*/
	LinearScale.prototype.map = function(value){
		return this.scale(value);
	};

	/**
	Returns band for a specified value

	@method
	@param {Number} max max value for a scale
	@param {Number} value to map
	@return {Number} similar to ordinal band but for
	linear scale
	*/
	LinearScale.prototype.band = function(max, value){
		return (max - this.scale(value));
	};

	/**
	Calculates the domain for the linear scale

	Data probably won't be uniform, so for each data element,
	a maximum value is obtained. The maximum element will be kept.
	Same situation is for the minimum element

	Keeps a reference for the minimum value

	@method
	@param {Object} data Accessor for the data collection
	@param {Object} f callback function
	@chainable
	*/
	LinearScale.prototype.calculateDomain = function(data, f){
		var max = -Infinity,
				min = Infinity;
				d = data.getData();

				d.forEach(function(element){
					var d = element.data,
							maxg = d3.max(d, f),
							ming = d3.min(d, f);

					max = Math.max(maxg, max);
					min = Math.min(ming, min);
			});

			return this.setDomain(Math.min(0, min), Math.max(0, max));
	};

	return LinearScale;
}));
/**
Ordinal Scale

@class OrdinalScale
@constructor
@extends BaseScale
@requires d3.chart,
					basescale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/ordinalscale',[
			'd3.chart',
			'charty/basescale',
			],
			function (d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    window.OrdinalScale = factory(d3, BaseScale);
  }
}(this, function (d3, BaseScale) {

	var OrdinalScale = function(axisType){
		this.scale = d3.scale.ordinal();
		this.axisType = axisType;
	};

	/**
	Inheritance from BaseScale
	*/
	OrdinalScale.prototype = new BaseScale();

	/**
	Sets the domain data for the scale

	@param {Array} domain values for ordinal domain
	@method
	@chainable
	*/
	OrdinalScale.prototype.setDomain = function(domain){
		this.scale = this.scale.domain(domain);
		return this;
	};

	/**
	Sets the range for the scale

	@param {Number} range numeric value for the range
	@method
	@chainable
	*/
	OrdinalScale.prototype.setRange = function(range){

		this.scale = this.scale.rangeRoundBands(this.generateRange(range) , 0.1);
		return this;
	};

	/**
	Maps a value to the current scaling
	Since ordinal scales computes a band width
	A value needs to be mapped and moved according
	to that band width

	@method
	@param {String} value String value that belongs to the domain
	@param {Number} factor reduce factor for overlapping charts
	@return {Number} mapped String value
	*/
	OrdinalScale.prototype.map = function(value, factor){
		return (this.scale(value) + ((this.scale.rangeBand() - (this.scale.rangeBand() * factor))/2));
	};

	/**
	Returns the range band for the scale
	Can be reduced if (factor < 1)

	@method
	@param {Number} factor reduce factor
	@return {Number} scale width
	*/
	OrdinalScale.prototype.band = function(factor){
		return (this.scale.rangeBand() * factor);
	};

	/**
	Calculates the scale domain, based on a data collection and a
	callback function
	Regarding the data series, ordinal scales should be uniform, whether
	they have values for that specific ordinal element or not.

	@method
	@param {Object} data Accessor for the data collection
	@param {Object} f callback function
	@chainable
	*/
	OrdinalScale.prototype.calculateDomain = function(data, f){
		var dataSample = data.first().data,
				dom = dataSample.map(f);

		return this.setDomain(dom);
	};

	/**
	Checks if domain wasn't previously calculated

	@method
	@return {Boolean} True if domain isn't set
	*/
	OrdinalScale.prototype.defaultDomain = function(){
		return (this.scale.domain().length === 0);
	};

	return OrdinalScale;
}));
/**
Scale factory. Separation is provived in an intent
to provide an easy way to switching scales in a defined chart

@class ScaleFactory
@constructor
@requires d3.chart,
          charty,
          ordinalscale,
          linearscale

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/scalesfactory',[
      'charty/chartynames',
      'charty/ordinalscale',
      'charty/linearscale',
      ],
      function(Charty, OrdinalScale, LinearScale) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(Charty, OrdinalScale, LinearScale);
    });
  }
  else {
    /** Browser globals */
    window.ScaleFactory = factory(Charty, OrdinalScale, LinearScale);
  }
}(this, function(Charty, OrdinalScale, LinearScale) {
	var ScaleFactory = function(){

	};

	/**
	Returns a specified scale object, acording to a scale type

	@method
	@param {String} scaleType Available scale type
	@param {String} axisType Related axis type ('x'-'y')
	@return {Object} LinearScale / OrdinalScale
	*/
	ScaleFactory.prototype.scale = function(scaleType, axisType){
		var scale;

		switch(scaleType){
			case Charty.AXIS_TYPE.ORDINAL :
				scale = new OrdinalScale(axisType);
				break;
			case Charty.AXIS_TYPE.LINEAR :
				scale = new LinearScale(axisType);
				break;
		}

		return scale;
	};

	return ScaleFactory;
}));
/**
Base class for charts
Contains common functionality

@class BaseChart
@requires d3,
          underscore,
          d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/basechart',[
      'd3.chart',
      'underscore',
      ],
      function (d3, _) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, _);
  }
}(this, function (d3, _) {

  d3.chart('BaseChart',{
    /**
    Sets the width for the chart
    In case chart contains components, width will
    propagate to them

    @method
    @param {Number} newWidth width for the chart
    @chainable
    */
    width : function(newWidth){

      this.w = newWidth;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.width(newWidth);
        });
      }

      return this;
    },
    /**
    Sets the height for the chart. Propagates to
    components.

    @method
    @param {Number} newHeight height for the chart
    */
    height : function(newHeight){

      this.h = newHeight;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.height(newHeight);
        });
      }

      return this;
    },
    /**
    Sets the scale type for the x data mapping chart.
    Propagates to components

    Not all charts use scales. Some can use direct
    mapping.

    @method
    @param {Oject} LinearScale, OrdinalScale
    @chainable
    */
    setXScale : function (scale){

      this.xscale = scale;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.setXScale(scale);
        });
      }

      return this;
    },
    /**
    Sets the scale type for the y data mapping chart.
    Propagates to components.

    Not all charts use scales. Some can use direct
    mapping.

    @method
    @param {Oject} LinearScale, OrdinalScale
    @chainable
    */
    setYScale : function (scale){

      this.yscale = scale;
      if ( this.componentsMixins ){
        _.each(this.componentsMixins, function (element){
          element.setYScale(scale);
        });
      }

      return this;
    },
    /**
    Sets mixins

    @method
    @chainable
    */
    setMixins : function(){
      if( !this.componentsMixins ){
        this.componentsMixins = [];
      }

      var args = Array.prototype.slice.call(arguments,0),
          self = this;

      _.each(args, function(mixin){
        self.componentsMixins.push(mixin);
      });

      return this;
    }
  });
}));
 /**
Defines a basic chart to process individual data series

@class SimpleDataGroup
@extends BaseChart
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/simpledatagroup',[
      'd3.chart',
      'charty/chartynames',
      'charty/basechart'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.BASE_CHART)
    .extend(Charty.CHART_NAMES.SIMPLE_DATA_GROUP, {
    /**
    Returns the next element of the data collection

    @method
    @param {Object} data Data Accessor
    @return {Object} next element in the collection
    */
    transform : function (data) {

      return data.next();
    }
  });
}));
/**
Basic Axis representation.

Only one X/Y is sufficient for chart drawing, but can
contain more. The idea is to draw an axis and locate it
wherever is necessary.

Wether Axis is a BaseChart, no need to extend it, since
it will implement all the functions needed.

@class Axis
@constructor
@requires d3.chart,
          charty

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/axis',[
      'd3.chart',
      'charty/chartynames'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.AXIS, {
    /**
    Basic Axis initialization

    @method
    */
    initialize : function(args){

      /**
      Tranlation value in the x direction

      @property
      @type Number
      @default 0
      */
      this.xt = 0;
      /**
      Tranlation value in the y direction

      @property
      @type Number
      @default 0
      */
      this.yt = 0;

      /**
      Defaults for axis

      c : axis style class
      */
      var defaults = {
        c : 'axis'
      };

      var axis = d3.svg.axis();

      /**
      Layer options
      */
      var axisLayerOptions = {
        /**
        Data bind for axis
        Since axis requires just a scale, only one element
        will be set for the data selection

        @method
        @param {Object} d
        */
        dataBind : function(d){

          var chart = this.chart();

          if(!chart.scale){
            throw new Error('Undefined scale for axis.');
          }

          axis = axis.scale(chart.scale.getScale())
                     .orient(chart.o);

          return this.selectAll('g').data([true]);
        },
        /**
        Insert for axis. Just inserts one svg:g
        element.

        @method
        */
        insert : function(){
          return this.append('g');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              /**
              Renders as a grid.
              */
              if(chart.grid){
                  axis = axis.tickSize(-chart.tsize,0,0);
              }

              this.classed(defaults.c, true)
                  .call(axis);

              /**
              Axis translation in x or y direction.
              */
              if(chart.xt !== 0 || chart.yt !== 0){
                this.attr('transform', 'translate(' + chart.xt + ',' + chart.yt + ')');
              }

              return this;
          },
          'remove' : function(){

            return this.remove();
          }
        }
      };

      /**
      Axis layer creation
      */
      this.layer('axis',this.base.append('g'), axisLayerOptions);
    },
    /**
    Sets tick size for the axis

    @method
    @param {Number} size ticksize
    @chainable
    */
    tickSize : function(size){
      /**
      Size for the ticks. Necessary
      to define a grid chart.

      @property
      @type Number
      @default 0
      */
      this.tsize = (size || 0);
      return this;
    },
    /**
    Sets the scale that will be used for the axis

    @method
    @param {Object} d3.scale
    @chainable
    */
    setScale : function(scale){
      this.scale = scale;
      return this;
    },
    /**
    Shows the axis as a grid

    @method
    @param {Boolean} val true/false value
    @chainable
    @default false
    */
    showAsGrid : function(val){
      this.grid = val;
      return this;
    },
    /**
    Sets axis orientation

    @method
    @param {String} orient
    @chainable
    @default bottom
    */
    orient : function(orient){
      this.o = (orient || 'bottom');
      return this;
    },
    /**
    Sets x translation for axis.

    @method
    @param {Number} t tranlation value
    @chainable
    */
    xtranslate : function(t){
      this.xt = t;
      return this;
    },
    /**
    Sets y translation for axis.

    @method
    @param {Number} t tranlation value
    @chainable
    */
    ytranslate : function(t){
      this.yt = t;
      return this;
    }
  });
}));
/**
Bar drawer. Takes only one data series as input.

@class Bar
@constructor
@extends SimpleDataGroup
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/bar',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others*/
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory (d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.BAR, {
    /**
    Bar initialization

    @method
    */
    initialize : function(args){

      /**
      Sets only bar color as default.
      */
      var defaults = {
        c : 'bar-default'
      };

      var options = {
        /**
        Data bind for a bar serie.
        Can have a color set for the whole serie, or
        each bar can have an own color defined.

        @method
        @param {Object} d example = {
                                       color : 'red',
                                       data = [
                                        {x : 'Jan', y : 200, c : 'blue'}
                                       ]
                                    }
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          /**
          Sets color for the whole data serie.
          */
          chart.c = (d.c || defaults.c);

          return this.selectAll('rect').data(d.data);
        },
        /**
        Inserts a svg:rect element.

        @method
        @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          'merge' : function(){

            var chart = this.chart(),
                zeroY = chart.yscale.map(0),
                heightZeroY = chart.h - zeroY;

            /**
            chart.factor : value used to define bar's width. It can
            be useful to reduce the width, in case many data series
            are draw using bars.
            */
            this.attr('class', function(d){
                  return (d.c || chart.c);
                })
                .attr('x', function(d) { return chart.xscale.map(d.x, chart.factor);} )
                .attr('width', chart.xscale.band(chart.factor))
                .attr('y', function(d) {
                  return Math.min(zeroY, chart.yscale.map(d.y, chart.factor));
                })
                .attr('height', function(d) {
                  return Math.abs(chart.yscale.band(chart.h,d.y) - heightZeroY);}
                );

            return this;
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('barlayer', this.base ,options);

    }
  });
}));
/**
Circle drawer.

@class Circle
@extends SimpleDataGroup
@constructor
@requires d3.chart,
          underscore,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/circle',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.CIRCLE,{
    /**
    Circle initializator

    @method
    */
    initialize : function(args){

      var dataValidator = args.dataValidator,
          errors = {
            invalidRadio : 'Invalid value : radius for circles must be positive.'
          };

      /**
      Defaults for circles.

      r : circle radius
      c : circle color
      */
      var defaults = {
        r : 5,
        c : 'circle-default'
      };

      var options = {
        /**
        Data bind for a circle serie.
        Can have color and circle radius set for the whole serie,
        or own values for each data point.

        @method
        @param {Object} d example = {
                                      color : 'red',
                                      r : 5
                                      data : [
                                        {x : 'Jan', y: 300, c : 'blue', r : 20}
                                      ]
                                    }
        @chainable
        */
        dataBind: function(d){

          var chart = this.chart();

          chart.c = (d.c || defaults.c);
          chart.r = (dataValidator.isPositiveNumber(d.r, errors.invalidRadio) || defaults.r);

          return this.selectAll('circle').data(d.data);
        },
        /**
        Appends a svg:circle

        @method
        @chainable
        */
        insert : function(){
          return this.append('circle');
        },
        events : {
          'merge' : function(){

            var chart = this.chart();

            return this.attr('class',function(d){
                        return (d.c || chart.c);
                      })
                      .attr("r", function(d){
                        return (d.r || chart.r);
                      })
                      .attr('cx', function(d) { return chart.xscale.map(d.x,0); })
                      .attr('cy', function(d) { return chart.yscale.map(d.y,0); });
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('circles', this.base.append('g'), options);
    }
  });
}));
/**
Donut drawer.

@class Donut
@extends SimpleDataGroup
@constructor
@requires d3,
          underscore,
          d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/donut',[
        'd3.chart',
        'charty/chartynames',
        'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
      });
  } else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.DONUT, {
    /**
    Donut initialization

    @method
    */
    initialize: function(args) {

      var dataValidator = args.dataValidator,
          errors = {
            invalidRadius : 'Radius for donut chart must be numerical values'
          };

      /**
      ir : inner radius
      or : outter radius
      */
      var defaults = {
        ir: 90,
        or: 50
      };

      /**
      d3 layout for pie data mapping.
      */
      var pieLayout = d3.layout
        .pie()
        .sort(null)
        .value(function(d) {
          return d.x;
        });

      var arcGen = d3.svg.arc();

      var options = {
        /**
        Data bind for donut.
        Will take x elements as data for drawing
        or : outter radius
        ir : inner radius
        Each part of the donut must have a color set

        @method
        @param {Object} data example = {
                                          ir : 150,
                                          or : 100,
                                          xPosition : 100,
                                          yPosition : 100,
                                          data : [
                                            {x : 200, c: 'red' }
                                            {x : 500, c: 'blue'}
                                          ]
                                        }
        */
        dataBind: function(data) {

          var chart = this.chart();

          /** By default, donut will be centered in svg */
          chart.xPosition = (data.xPosition || (chart.w/2));
          chart.yPosition = (data.yPosition || (chart.h/2));

          /** Radius calculation */
          var radius = Math.min(chart.w, chart.h) / 2,
              ir = (dataValidator.isNumber(data.ir, errors.invalidRadius) || defaults.ir),
              or = (dataValidator.isNumber(data.or, errors.invalidRadius) || defaults.or);

          arcGen = arcGen.innerRadius(radius - ir)
                         .outerRadius(radius - or);

          return this.selectAll('path').data(pieLayout(data.data));
        },
        /**
        Adds a svg:path element for the donut

        @method
        */
        insert: function() {
          return this.append('path');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('transform', 'translate(' + (chart.xPosition) + ',' + (chart.yPosition) + ')')
                       .attr('class', function(d) {
                          return d.data.c;
                       })
                       .attr('d', arcGen);

          },
          'update': function() {

            var chart = this.chart();

            return this.attr('class', function(d) {
                        return d.data.c;
                       })
                       .attr('d', arcGen);
          },
          'exit': function() {

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('paths', this.base.append('g'), options);
    }
  });
}));
/**
Line drawing.

@class Line
@extends SimpleDataGroup
@constructor
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/line',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LINE, {
    /**
    Line initialization

    @method
    */
    initialize : function(){

      /**
      c : default color line
      */
      var defaults = {
        c : 'line-default'
      };

      var line = d3.svg.line();

      var options = {
        /**
        Data bind for a line serie.
        Since a line is drawed using d3.line
        a datum must be defined. Can also have a color
        for the whole serie.

        @method
        @param {Object} d example = {
                                      color : 'redline'
                                      data : [
                                        {x : 'Jan', y: 200},
                                        ...
                                      ]
                                    }
        */
        dataBind : function(d){

          var chart = this.chart();

          line.x(function(d) { return chart.xscale.map(d.x, 0); })
              .y(function(d) { return chart.yscale.map(d.y, 0); });

          chart.datum = d.data;
          chart.c = (d.c || defaults.c);

          return this.selectAll('path').data([0]);

        },
        /**
        Appends a svg:path

        @method
        @chainable
        */
        insert : function(){

          return this.append('path');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              return this.datum(chart.datum)
                         .classed(chart.c, true)
                         .attr('d',line);
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('lineslayer', this.base.append('g'), options);
    }
  });
}));
/**
Rounded rectangle drawer.

@class RoundedRectangle
@constructor
@extends SimpleDataGroup
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/roundedrectangle',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    // Browser globals
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.ROUNDED_RECTANGLE,{
    /**
    Rounded rectangle initialization.

    @method
    */
    initialize : function(args){

      var dataValidator = args.dataValidator,
          errors = {
            invalidRH : 'Invalid value for rectangle height. Must be positive number.',
            invalidRW : 'Invalid value for rectangle width. Must be positive number.',
            invalidRX : 'Invalid value for rectangle rx. Must be positive number.',
            invalidRY : 'Invalid value for rectangle ry. Must be positive number.'
          };

      /**
      Defaults for rectangle

      rh : rectangle height
      rw : rectangle width
      rc : rectangle color
      rx, ry : value for rounded corners
      */
      var defaults = {
        rh : 20,
        rw : 20,
        rc : 'rounded-rectangle-default',
        rx : 5,
        ry : 5
      };

      var options = {
        /**
        Data bind for Rounded Rectangle.
        Data defines a rectangle height (rh), width (rw),
        color (rc), rx, ry. If not defined, defauls are
        used.

        @method
        @param {Object} d example = {
                                      rh : 20,
                                      rw : 20,
                                      rc : 'red'
                                      data : [...]
                                    }
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          chart.rh = (dataValidator.isPositiveNumber(d.rh, errors.invalidRH) || defaults.rh);
          chart.rw = (dataValidator.isPositiveNumber(d.rw, errors.invalidRH) || defaults.rw);
          chart.rx = (dataValidator.isPositiveNumber(d.rx, errors.invalidRX) || defaults.rx);
          chart.ry = (dataValidator.isPositiveNumber(d.ry, errors.invalidRY) || defaults.ry);
          chart.rc = (d.rc || defaults.rc);

          return this.selectAll('rect').data(d.data);
        },
        /**
        Appends a svg:rect element.

        @method
        @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          'merge' : function(){

            var chart = this.chart();

            return this.attr('height', chart.rh)
                       .attr('width', chart.rw)
                       .attr('x', function(d){
                          return chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                        })
                       .attr('y',function(d){
                          return chart.yscale.map(d.y)-(chart.rh/2);
                        })
                       .attr('rx', chart.rx)
                       .attr('ry', chart.ry)
                       .attr('class', function(d){
                          return (d.rc || chart.rc);
                       });
          },
          'exit' : function(){
            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('roundedrects', this.base, options);
    }
  });
}));
/**
Text labeling.

@class Text
@extends SimpleDataGroup
@constructor
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/text',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.TEXT, {
    /**
    Text label initializator

    @method
    */
    initialize : function(){

      var options = {
        /**
        Data bind for text labeling.
        Can depend on other elements, for instance,
        the rounded rectangles to form a label.

        @method
        @param {Object} d example = {
                                      data : [...]
                                    }
        */
        dataBind : function(d){

          return this.selectAll('text').data(d.data);
        },
        /**
        Insert a svg:text element for each data input.

        @mehtod
        @chainable
        */
        insert : function(){
          return this.append('text');
        },
        events : {
          'enter' : function(){

              var chart = this.chart();

              return this.attr('x', function(d){
                            return chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2);
                          })
                         .attr('y', function(d){
                            return chart.yscale.map(d.y);
                          })
                         .attr('text-anchor', 'middle')
                         .attr('dy', '0.35em')
                         .text(function(d) { return d.y; });
          },
          'update' : function(){

              var chart = this.chart();

              return this.attr('x', function(d){
                            return chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2);
                          })
                         .attr('y', function(d){
                            return chart.yscale.map(d.y);
                          })
                         .text(function(d) { return d.y; });
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('texts', this.base.append('g') , options);
    }
  });
}));
/**
Triangle drawer.

@class Triangle
@constructor
@extends SimpleDataGroup
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/triangle',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.TRIANGLE, {
    /**
    Triangle initialization

    @method
    */
    initialize : function(){

      /**
      c : triangle color
      */
      var defaults = {
        c : 'triangle-default'
      };

      var options = {
        /**
        Data bind for a triangle serie.
        Will set a color for the whole serie.

        @method
        @param {Object} d example = {
                                      color : 'red',
                                      data : [
                                        {x : 'Jun', y : 200 , c:'blue'},
                                        ...
                                      ]
                                    }
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          chart.c = (d.c || defaults.c);

          return this.selectAll('path').data(d.data);

        },
        /**
        Appends a svg:path

        @method
        @chainable
        */
        insert : function(){
          return this.append('path');
        },
        events : {
          'merge' : function(){

            var chart = this.chart(),
                y1 = chart.yscale.map(0),
                band = chart.xscale.band(1);

            return this.attr('class', function(d){
                          return (d.c || chart.c);
                        })
                       .attr('d', function(d){
                          return chart.getPath(d, y1, band);
                        });
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('triangles', this.base.append('g') , options);
    },
    /**
    Path is defined as a string connecting different
    data, visualized as dots.

    @method
    @param {Object} d
    @return {String} path
    */
    getPath : function(d, y1, band){

      var x1 = this.xscale.map(d.x,1);

      return  ('M ' + x1 + ' ' + y1 +
              ' L ' + (x1 + band/2) + ' ' + this.yscale.map(d.y) +
              ' L ' + (x1 + band) + ' ' + y1);
    }
    /**
    Triangle drawer IS SimpleDataInput
    However, transform must be redefined in order to
    separate a triangle in two constituting parts

    @method
    @param {Object} data Data Acccessor
    @return {Object} already mapped values for each datapoint

    transform : function(data){
      var result = [];

      var dataArray = data.next().data;

      for(var i = 0; i < dataArray.length; i++){
        var element = dataArray[i];

        var x1 = this.xscale.map(element.x,1);
        var x2 = x1 + this.xscale.band(1)/2;
        var x3 = x1 + this.xscale.band(1);

        var y1 = this.yscale.map(0);
        var y2 = this.yscale.map(element.y);

        result.unshift({x1 : x1, y1: y1, x2 : x2, y2 : y2, x3 : x2, y3 : y1, c: element.c1});
        result.unshift({x1 : x2, y1: y1, x2 : x2, y2 : y2, x3 : x3, y3 : y1, c: element.c2});

      }
      return result;
    },
    /**
    Path is defined as a string connecting different
    data, visualized as dots.

    @method
    @param {Object} d
    @return {String} path

    getPath : function(d){
      var p = 'M '+d.x1+' '+d.y1+' L '+d.x2+' '+d.y2+' L '+d.x3+' '+d.y3;
      return p;
    }*/
  });
}));
/**
Defines a data transformation for composite charts

@class MultipleDataGroup
@extend BaseChart
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/multipledatagroup',[
      'd3.chart',
      'charty/chartynames',
      'charty/basechart'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.BASE_CHART)
    .extend(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP, {
    /**
    Data transformation for multiple data series
    Once scales are obtained, they have to be set to the mixins contained

    @method
    @param {Object} data Data accessor
    @return {Object} Data accesor
    */
    transform : function(data){

      this.xscale.calculateDomain(data, function(d){return d.x;}).setRange(this.w);
      this.yscale.calculateDomain(data, function(d){return d.y;}).setRange(this.h);

      return data;
    }
  });
}));
/**
Chart that can represent many data series

@class MultipleInstancesMixin
@extends BaseChart
@constructor
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/multipleinstancesmixin',[
      'd3.chart',
      'charty/chartynames',
      'charty/basechart'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.BASE_CHART)
    .extend(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, {
    /**
    Creates multiple mixin instances of a specific chart.
    It is necessary to set the instances count
    and the chart name.

    @method
    @param {Object} args example = {
                                        instances : 2,
                                        chartName : 'Bar'
                                      }
    */
    initialize : function(args){

      var f = args.instances;

      this.componentsMixins = [];

      for(var i = args.instances - 1; i >= 0; i--){

        var instance = this.mixin(args.chartName,
                                  this.base.append('g'),
                                  args);

        instance.factor = ((f--)/args.instances);
        this.setMixins(instance);
      }
    }
  });
}));
/**
Base XY system for all the 2D charts.

@class XYAxis
@constructor
@requires d3.chart,
          charty,
          axis

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/xyaxis',[
      'd3.chart',
      'charty/chartynames',
      'charty/axis'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.XY_AXIS, {
    /**
    XY axis system initializer

    @method
    */
    initialize : function(args){

        this.xaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                                this.base.append('g'),
                                args).orient('bottom');

        this.yaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                                this.base.append('g'),
                                args).orient('left');

    },
    /**
    Show whole chart as a grid.

    @method
    @chainable
    */
    showAsGrid : function(){
      this.xaxis.showAsGrid(true);
      this.yaxis.showAsGrid(true);
      return this;
    },
    /**
    Moves x axis according to given height value, and sets
    tick size value.

    @method
    @param {Number} newHeight chart's height
    @chainable
    */
    height : function(newHeight){
      this.xaxis.ytranslate(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Sets tick size, based on given width value

    @method
    @param {Number} newWidth chart's width
    @chainable
    */
    width : function(newWidth){
      this.yaxis.tickSize(newWidth);
      return this;
    },
    /**
    Sets x scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setXScale : function(scale){
      this.xaxis.setScale(scale);
      return this;
    },
    /**
    Sets y scale.

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setYScale : function(scale){
      this.yaxis.setScale(scale);
      return this;
    }
  });
}));
/**
Defines a YXY axis system.
Two Y Axis (one left, one right)
One X Axis (bottom)

@class YXYAxis
@constructor
@requires d3.chart,
          charty,
          axis

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/yxyaxis',[
      'd3.chart',
      'charty/chartynames',
      'charty/axis',
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.YXY_AXIS, {
    /**
    Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

    @method
    */
    initialize : function(args){
      this.xaxis = this.mixin(Charty.CHART_NAMES.AXIS,
                              this.base.append('g'),
                              args).orient('bottom');

      this.yaxisleft = this.mixin(Charty.CHART_NAMES.AXIS,
                            this.base.append('g'),
                            args).orient('left');

      this.yaxisright = this.mixin(Charty.CHART_NAMES.AXIS,
                                   this.base.append('g'),
                                   args).orient('right');

    },
    /**
    Show whole chart as a grid.

    @method
    @chainable
    */
    showAsGrid : function(){
      this.xaxis.showAsGrid(true);
      this.yaxisleft.showAsGrid(true);
      return this;
    },
    /**
    Sets x axis position and tick size

    @method
    @param {Number} newHeight chart's height
    @chainable
    */
    height : function(newHeight){
      this.xaxis.ytranslate(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Sets y axis disposition, based on a given
    width value, and tick size for only one y axis.

    @method
    @param {Number} newWidth chart's width
    @chainable
    */
    width : function(newWidth){
      this.yaxisright.xtranslate(newWidth);
      this.yaxisleft.tickSize(newWidth);
      return this;
    },
    /**
    Redefinition of x scale setter

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setXScale : function(scale){
      this.xaxis.setScale(scale);
      return this;
    },
    /**
    Redefinition of y scale setter

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setYScale : function(scale){
      this.yaxisleft.setScale(scale);
      this.yaxisright.setScale(scale);
      return this;
    }
  });
}));
/**
Create a bar chart that will render
N data series

@class BarChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          bar,
          multipledatagroup,
          yxyaxis,
          multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/barchart',[
      'd3.chart',
      'charty/chartynames',
      'charty/bar',
      'charty/multipledatagroup',
      'charty/xyaxis',
      'charty/yxyaxis',
      'charty/multipleinstancesmixin',
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.BAR_CHART,{
		/**
		BarChart initialization.

		@method
		@param {Object} args example = {
                          instances : 2,
                        }
		*/
		initialize : function(args){

			var options = {
				chartName : Charty.CHART_NAMES.BAR,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var axis = this.mixin(args.axisSystem,
                           this.base.append('g'),
                           { dataValidator : args.dataValidator }).showAsGrid(),

					barChart = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                this.base.append('g'),
                                options);

      this.setMixins(barChart, axis);
		}
	});
}));
/**
Custom donut chart.
Sets a text inside the donut, showing a text label
with the represented value.

So, this representation will get only one value. The
other one must be calculated (rest).

The problem can't be solved using mixins, since the text position
doesn't depend on the data value.

@class DonutWithInnerText
@constructor
@extends Donut
@requires d3.chart,
          charty,
          donut

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define( 'charty/donutwithinnertext',[
            'd3.chart',
            'charty/chartynames',
            'charty/donut'
            ],
            function (d3, Charty) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.DONUT)
    .extend(Charty.CHART_NAMES.DONUT_INNER_TEXT,{
    initialize : function(args){

      var dataValidator = args.dataValidator,
          errors = {
            invalidFontSize : 'Invalid value : font size must be positive'
          };

      /**
      Defaults for Inner text
      */
      var defaults = {
        fontSize : 55
      };

      var options = {
        /**
        First element will be shown as label.

        Data here will take two elements, since is necessary
        to render two paths for the donut chart.

        The first one is the one that will be shown in label.
        The second one is the rest of the donut.

        @method
        @param {Object} data
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart(),
              data = d.data,
              stringValue = (data[0].x).toString() +'%';

          chart.fontSize = (dataValidator.isPositiveNumber(d.fontSize, errors.invalidFontSize) || defaults.fontSize);
          /** By default, text will be centered inside donut */
          chart.xPosition = (d.xPosition || (chart.w/2));
          chart.yPosition = (d.yPosition || (chart.h/2));

          return this.selectAll('text').data([stringValue]);
        },
        /**
        Inserts one text for the value to display

        @method
        @chainable
        */
        insert : function(){
          return this.append('text');
        },
        events : {
          'enter' : function(){

            var chart = this.chart();

            this.attr('x', chart.xPosition)
                .attr('y', chart.yPosition)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('font-size', chart.fontSize)
                .text(function(d){
                  return d;
                });

            return this;
          },
          'update' : function(){

            this.text(function(d){
              return d;
            });

            return this;
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('donutText', this.base.append('g'), options);
    }
  });
}));
/**
Labeled triangle chart drawer.

@class LabeledTriangleChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          triangle,
          roundedrectangle,
          textlabel,
          multipleinstancesmixin,
          yxyaxis,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/labeledtrianglechart',[
      'd3.chart',
      'charty/chartynames',
      'charty/triangle',
      'charty/roundedrectangle',
      'charty/text',
      'charty/multipleinstancesmixin',
      'charty/yxyaxis',
      'charty/multipledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LABELED_TRIANGLE_CHART, {
    /**
    Labeled triangle constructor.

    Will contain only one instance of each component chart, since no
    resize can be assumed.

    @method
    */
    initialize: function(args) {

      var axis = this.mixin(args.axisSystem,
                            this.base.append('g'),
                            { dataValidator : args.dataValidator }).showAsGrid(),

          triangles = this.mixin(Charty.CHART_NAMES.TRIANGLE,
                                this.base.append('g'),
                                args),

          recs = this.mixin(Charty.CHART_NAMES.ROUNDED_RECTANGLE,
                            this.base.append('g'),
                            args),

          texts = this.mixin(Charty.CHART_NAMES.TEXT,
                            this.base.append('g'),
                            args);

      this.setMixins(triangles, recs, texts, axis);
    }
  });
}));
/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@constructor
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
    define('charty/linechart',[
      'd3.chart',
      'charty/chartynames',
      'charty/line',
      'charty/multipledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
      });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LINE_CHART,{
		/**
		Multiple data group initializator.

		Creates N instances of a given mixin.

		@method
		@param {Object} args N = args.instances
		*/
		initialize : function(args){
			var options = {
				chartName : Charty.CHART_NAMES.LINE,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var axis = this.mixin(args.axisSystem,
                            this.base.append('g'),
                            { dataValidator : args.dataValidator }).showAsGrid(),

					lineChart = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                                this.base.append('g'),
                                options);

      this.setMixins(lineChart, axis);
		}
	});
}));
/**
Line chart combined with circles.

@class LineChartCircles
@constructor
@extends MultipleDataGroup
@requires	d3.chart,
          charty,
					multipledatagroup,
					linechart,
					multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/linechartcircles',[
      'd3.chart',
      'charty/chartynames',
      'charty/multipledatagroup',
      'charty/linechart',
      'charty/multipleinstancesmixin'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.LINE_CHART_CIRCLES,{
		/**
		Line and circles chart initializator.

		@method
		@param {Object} args example = {
                              instances : 2
                          }
		*/
		initialize : function(args){

			var options = {
				chartName : Charty.CHART_NAMES.CIRCLE,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1),
        axisSystem : args.axisSystem
			};

			var lineChart = this.mixin(Charty.CHART_NAMES.LINE_CHART,
                                this.base.append('g'),
                                options),

					circles = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                              this.base.append('g'),
                              options);

      this.setMixins(lineChart, circles);
		}
	});
}));
/**
Scatterplot chart

@class Scatterplot
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          circle,
          multipledatagroup,
          yxyaxis,
          multipleinstancesmixin

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/scatterplot',[
      'd3.chart',
      'charty/chartynames',
      'charty/circle',
      'charty/multipledatagroup',
      'charty/yxyaxis',
      'charty/multipleinstancesmixin'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
	d3.chart(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.SCATTERPLOT, {

		initialize : function(args){
			var options = {
				chartName : Charty.CHART_NAMES.CIRCLE,
        dataValidator : args.dataValidator,
				instances : (args.instances || 1)
			};

			var axis = this.mixin(args.axisSystem,
                            this.base.append('g'),
                            { dataValidator : args.dataValidator }).showAsGrid(),

          circles = this.mixin(Charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN,
                               this.base,
                               options);

      this.setMixins(circles, axis);
		}
	});
}));
/**
Accessor for data collection

Accessor will iterate over the data collection.

@class Accessor
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/accessor', function () {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory();
    });
  }
  else {
    /** Browser globals */
    root.Accessor = factory();
  }
}(this, function() {
  function Accessor(d) {
    this.index = -1;
  }

  /**
  Returns first element of the collection

  @method
  @return {Object} data element from the collection
  */
  Accessor.prototype.first = function() {
    return this.data[0];
  };

  /**
  Returns the next element of the collection
  If no more elements are available,
  collection index will reset itself

  @method
  @return {Object} next element in the collection,
  first element in case of reset
  */
  Accessor.prototype.next = function() {
    if(!this.hasNext()){
      this.restart();
    }
    return this.data[++this.index];
  };

  /**
  Determines if the collection has more elements

  @method
  @return {Boolean} true if collection has more elements,
  false if not
  */
  Accessor.prototype.hasNext = function() {
    return this.index + 1 < this.data.length;
  };

  /**
  Resets the colletion to restart iteration automatically

  @method
  */
  Accessor.prototype.restart = function() {
    this.index = -1;
  };

  /**
  Returns the data contained in the accessor

  @method
  @return {Object} data collection
  */
  Accessor.prototype.getData = function() {
    return this.data;
  };

  /**
  Sets a specific data set to this accessor

  @method
  @param {Object} data Data series
  */
  Accessor.prototype.setData = function(data){
    this.data = data;
  };

  return Accessor;
}));
/**
Sets an interface for adding a link between the chart
and the data accessor.

@class ChartInterface
@constructor
@requires accessor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/chartinterface',[
      'charty/accessor'
      ],
      function (Accessor) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(Accessor);
    });
  }
  else {
    /** Browser globals */
    root.ChartInterface = factory(Accessor);
  }
}(this, function (Accessor) {

  /**
  @param {Object} chart d3.chart object
  */
  var ChartInterface = function(chart){
    this.accessor = new Accessor();
    this.chart = chart;
  };

  /**
  Interface to the chart drawing stage

  @method
  @param {Object} dataArray Data series contained in one array
  */
  ChartInterface.prototype.draw = function(dataArray){
    this.accessor.setData(dataArray);
    this.chart.draw(this.accessor);
  };

  /**
  Alternative for height setting

  @method
  @param {Number} newHeight
  @chainable
  */
  ChartInterface.prototype.height = function(newHeight){
    this.chart.height(newHeight);
    return this;
  };

  /**
  Alternative for width setting

  @method
  @param {Number} newWidth
  @chainable
  */
  ChartInterface.prototype.width = function(newWidth){
    this.chart.width(newWidth);
    return this;
  };

  return ChartInterface;
}));
/**
Full chart api

@class Charty

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/charty',[
      'charty/chartynames',
      'charty/scalesfactory',
      'charty/chartinterface',
      'charty/datavalidator',
      'charty/barchart',
      'charty/labeledtrianglechart',
      'charty/linechart',
      'charty/scatterplot',
      'charty/donut',
      'charty/donutwithinnertext',
      'charty/linechartcircles'
      ],
      function (Charty, ScaleFactory, ChartInterface, DataValidator) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(Charty, ScaleFactory, ChartInterface, DataValidator);
    });
  }
  else {
    /** Browser globals */
    root.Charty = factory(Charty, ScaleFactory, ChartInterface, DataValidator);
  }
}(this, function (Charty, ScaleFactory, ChartInterface, DataValidator) {

  /**
  Appends a chart to a root d3.selection element. Chart is determined
  by a defined chart name.
  Margin is used to translate the chart a small distance. A chart can have many
  instances.
  Whether the chart takes the container dimensions, is it possible to also set
  the dimensions as initial options

  @method
  @param {Object} options options = {
                    chartName : 'BarChart',
                    instances : 2,
                    root : 'body',
                    xAxis : 'ordinal',
                    yAxis : 'linear',
                    margin : {
                      left : 20,
                      top : 20,
                      lfactor : 0.8
                      tfactor : 0.8
                    },
                    height : 400,
                    width : 400
  @return {Object} d3.chart for data drawing
  */
  Charty.chart = function(options) {

    if( !this.scaleFactory ){
      this.scaleFactory = new ScaleFactory();
    }

    if( !this.dataValidator ){
      this.dataValidator = new DataValidator();
    }

    if (!options.root || !options.chartName) {
      throw new Error('Root element or chart name not defined');
    }

    var selection = d3.select(options.root),
        height = (parseInt(selection.style('height'), 10) || options.height || 200),
        width  = (parseInt(selection.style('width'), 10) || options.width || 200);

    /**
    Set default values for margin, for the svg element.
    */
    var marginValues = {
      left: (options.marginleft || 0),
      top: (options.margintop || 0),
      lfactor: (options.marginlfactor || 1),
      tfactor: (options.margintfactor || 1)
    };

    /**
    Sets background image via CSS
    */
    if (options.imgLocation){
      selection.classed(options.imgLocation, true);
    }

    /**
    Svg element creation
    */
    var svg = selection.append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + marginValues.left + ',' + marginValues.top + ')');

    /**
    Chart dimension values are porcentaje from svg adapted value.
    */
    width = (width - marginValues.top) * marginValues.lfactor;
    height = (height - marginValues.left) * marginValues.tfactor;

    /**
    Appends the chart to the specified html element.
    */
    var chart = svg.chart(options.chartName, {
                    instances: options.instances,
                    dataValidator : this.dataValidator,
                    axisSystem : options.axisSystem
                  })
                  .height(height)
                  .width(width);

    /**
    Scale definition.
    Some charts can use direct mapping instead of scaling.
    */
    if (options.xAxis){
      chart = chart.setXScale(this.scaleFactory.scale(options.xAxis,'x'));
    }
    if (options.yAxis){
      chart = chart.setYScale(this.scaleFactory.scale(options.yAxis,'y'));
    }

    /**
    Returns the interface for the chart drawing
    */
    return new ChartInterface(chart);
  };

  return Charty;
}));