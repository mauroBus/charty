/**
Define constants that will be used as names for different parts

@class ChartNames

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty',
      function() {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory();
    });
  }
  else {
    /** Browser globals */
    return factory();
  }
}(this, function() {

  var Charty = {

  };

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
    define('basescale',[
      'd3.chart',
      'charty'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

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

		if(this.axisType === charty.AXIS.X){
			r = [0,range];
		}
		else{
			if(this.axisType === charty.AXIS.Y){
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
    define('linearscale',[
			'd3.chart',
			'basescale'
			],
			function(d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, BaseScale);
  }
}(this, function(d3, BaseScale) {

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
		var max = -100000,
				min = 1000000;
				d = data.getData();

				d.forEach(function(element){
					var d = element.data,
							maxg = d3.max(d, f),
							ming = d3.min(d, f);

					max = Math.max(maxg, max);
					min = Math.min(ming, min);
			});

			this.min = min;

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
    define('ordinalscale',[
			'd3.chart',
			'basescale',
			],
			function(d3, BaseScale) {
				/** Export global even in AMD case in case this script
				is loaded with others */
				return factory(d3, BaseScale);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, BaseScale);
  }
}(this, function(d3, BaseScale) {

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
    define('scalesfactory',[
      'd3.chart',
      'charty',
      'ordinalscale',
      'linearscale',
      ],
      function(d3, charty, OrdinalScale, LinearScale) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty, OrdinalScale, LinearScale);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty, OrdinalScale, LinearScale);
  }
}(this, function(d3, charty, OrdinalScale, LinearScale) {
	var ScaleFactory = function(){

	};

	/**
	Returns a specified scale object, acording to a scale type

	@method
	@param {String} scaleType Available scale type
	@param {String} axisType Related axis type ('x'-'y')
	@return {Object} d3.scale
	*/
	ScaleFactory.prototype.scale = function(scaleType, axisType){
		var scale;

		switch(scaleType){
			case charty.AXIS_TYPE.ORDINAL :
				scale = new OrdinalScale(axisType);
				break;
			case charty.AXIS_TYPE.LINEAR :
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
    define('basechart',[
      'd3.chart',
      'underscore',
      ],
      function(d3, _) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, _);
  }
}(this, function(d3, _) {

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

      if(arguments.length === 0){
        return this.w;
      }

      if(!newWidth || !_.isNumber(newWidth) || newWidth < 0){
        throw new Error('Invalid width value for chart.');
      }

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

      if(arguments.length === 0){
        return this.h;
      }

      if(!newHeight || !_.isNumber(newHeight) || newHeight < 0){
        throw new Error('Invalid height value for chart.');
      }

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

      if ( !scale ){
        throw new Error('Undefined x scale');
      }

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

      if ( !scale ){
        throw new Error('Undefined y scale');
      }

      this.yscale = scale;
      if ( this.componentsMixins ){
        _.each(this.componentsMixins, function (element){
          element.setYScale(scale);
        });
      }

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
    define('simpledatagroup',[
      'd3.chart',
      'charty',
      'basechart'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.BASE_CHART)
    .extend(charty.CHART_NAMES.SIMPLE_DATA_GROUP, {
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
    define('axis',[
      'd3.chart',
      'charty'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.AXIS, {
    /**
    Basic Axis initialization

    @method
    */
    initialize : function(){

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

          chart.c = (d.c || defaults.c);

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

              this.attr('class', chart.c)
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
    define('bar',[
      'd3.chart',
      'charty',
      'simpledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others*/
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.BAR, {
    /**
    Bar initialization

    @method
    */
    initialize : function(){

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
          chart.c = (d.color || defaults.c);

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
    define('circle',[
      'd3.chart',
      'underscore',
      'charty',
      'simpledatagroup'
      ],
      function(d3, _, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, _, charty);
  }
}(this, function(d3, _, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.CIRCLE,{
    /**
    Circle initializator

    @method
    */
    initialize : function(){

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

          chart.c = (d.color || defaults.c);

          /**
          If custom radio is set, check for a valid value.

          Otherwise, takes default value.
          */
          if(d.r){
            if( !_.isNumber(d.r) || d.r < 0 ){
              throw new Error('Circle radius must be a positive number.' );
            }
            else{
              chart.r = d.r;
            }
          }
          else{
            chart.r = defaults.r;
          }

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
    define('donut',[
        'd3.chart',
        'underscore',
        'charty',
        'simpledatagroup'
      ],
      function(d3, _, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _, charty);
      });
  } else {
    /** Browser globals */
    return factory(d3, _, charty);
  }
}(this, function(d3, _, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.DONUT, {
    /**
    Donut initialization

    @method
    */
    initialize: function() {

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
              ir = (data.ir || defaults.ir),
              or = (data.or || defaults.or);

          if (!_.isNumber(ir) || !_.isNumber(or)) {
            throw new Error('Radius for donut chart must be numerical values');
          }

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
                       .attr('fill', function(d) {
                          return d.data.c;
                       })
                       .attr('d', arcGen);

          },
          'update': function() {

            var chart = this.chart();

            return this.attr('fill', function(d) {
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
    define('line',[
      'd3.chart',
      'charty',
      'simpledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LINE, {
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

          line.x(function(d) {
            return chart.xscale.map(d.x, 0);
          }).y(function(d) {
            return chart.yscale.map(d.y, 0);
          });

          chart.datum = d.data;
          chart.c = (d.color || defaults.c);

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
                         .attr('class', chart.c)
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
          underscore,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('roundedrectangle',[
      'd3.chart',
      'underscore',
      'charty',
      'simpledatagroup'
      ],
      function(d3, _, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _, charty);
    });
  }
  else {
    // Browser globals
    return factory(d3, _, charty);
  }
}(this, function(d3, _, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.ROUNDED_RECTANGLE,{
    /**
    Rounded rectangle initialization.

    @method
    */
    initialize : function(){

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

      var pathBase = this.base;

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

          chart.rh = (d.rh || defaults.rh);
          chart.rw = (d.rw || defaults.rw);
          chart.rc = (d.rc || defaults.rc);
          chart.rx = (d.rx || defaults.rx);
          chart.ry = (d.ry || defaults.ry);

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

            if(chart.rh){
              if(!_.isNumber(chart.rh) || chart.rh < 0){
                throw new Error('Invalid value for rectangle height. Must be positive number.');
              }
            }

            if(chart.rw){
              if(!_.isNumber(chart.rw) || chart.rw < 0){
                throw new Error('Invalid value for rectangle width. Must be positive number.');
              }
            }

            return this.attr('height', chart.rh)
                       .attr('width', chart.rw)
                       .attr('x', function(d){
                          var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                          return val;
                        })
                       .attr('y',function(d){
                          return chart.yscale.map(d.y)-(chart.rh/2);
                        })
                       .attr('rx', chart.rx)
                       .attr('ry', chart.ry)
                       .attr('fill',function(d){
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
      this.layer('roundedrects', pathBase, options);
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
    define('text',[
      'd3.chart',
      'charty',
      'simpledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.TEXT, {
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
    define('triangle',[
      'd3.chart',
      'charty',
      'simpledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.TRIANGLE, {
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

          chart.c = (d.color || defaults.c);

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
    define('multipledatagroup',[
      'd3.chart',
      'charty',
      'basechart'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.BASE_CHART)
    .extend(charty.CHART_NAMES.MULTIPLE_DATA_GROUP, {
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
    define('multipleinstancesmixin',[
      'd3.chart',
      'charty',
      'basechart'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.BASE_CHART)
    .extend(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, {
    /**
    Creates multiple mixin instances of a specific chart.
    It is necessary to set the instances count
    and the chart name.

    @method
    @param {Object} options example = {
                                        instances : 2,
                                        chartName : 'Bar'
                                      }
    */
    initialize : function(options){

      var f = options.instances;

      this.componentsMixins = [];

      for(var i = options.instances - 1; i >= 0; i--){
        var instance = this.mixin(options.chartName, this.base.append('g'));
        instance.factor = ((f--)/options.instances);
        this.componentsMixins.push(instance);
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
    define('xyaxis',[
      'd3.chart',
      'charty',
      'axis'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.XY_AXIS, {
    /**
    XY axis system initializer

    @method
    */
    initialize : function(){

        this.xaxis = this.mixin(charty.CHART_NAMES.AXIS,this.base.append('g'))
                         .orient('bottom');

        this.yaxis = this.mixin(charty.CHART_NAMES.AXIS,this.base.append('g'))
                         .orient('left');

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
    define('yxyaxis',[
      'd3.chart',
      'charty',
      'axis',
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.YXY_AXIS, {
    /**
    Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

    @method
    */
    initialize : function(){
      this.xaxis = this.mixin(charty.CHART_NAMES.AXIS, this.base.append('g')).orient('bottom');
      this.yaxisleft = this.mixin(charty.CHART_NAMES.AXIS,this.base.append('g')).orient('left');
      this.yaxisright = this.mixin(charty.CHART_NAMES.AXIS, this.base.append('g')).orient('right');

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
    define('barchart',[
      'd3.chart',
      'charty',
      'bar',
      'multipledatagroup',
      'yxyaxis',
      'multipleinstancesmixin',
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

	d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.BAR_CHART,{
		/**
		BarChart initialization.

		@method
		@param {Object} args example = {
                          instances : 2,
                        }
		*/
		initialize : function(args){

			var options = {
				chartName : charty.CHART_NAMES.BAR,
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS, this.base.append('g')).showAsGrid(),
					barChart = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'),options);

			this.componentsMixins = [];
			this.componentsMixins.push(barChart);
			this.componentsMixins.push(yxyaxis);
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
    define('donutwithinnertext',[
            'd3.chart',
            'charty',
            'donut'
            ],
            function(d3, charty) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.DONUT)
    .extend(charty.CHART_NAMES.DONUT_INNER_TEXT,{
    initialize : function(args){

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

          var chart = this.chart();

          chart.fontSize = (d.fontSize || defaults.fontSize);
          /** By default, text will be centered inside donut */
          chart.xPosition = (d.xPosition || (chart.w/2));
          chart.yPosition = (d.yPosition || (chart.h/2));

          var data = d.data,
              stringValue = (data[0].x).toString() +'%';

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
    define('labeledtrianglechart',[
      'd3.chart',
      'charty',
      'triangle',
      'roundedrectangle',
      'text',
      'multipleinstancesmixin',
      'yxyaxis',
      'multipledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
  d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LABELED_TRIANGLE_CHART, {
    /**
    Labeled triangle constructor.

    Will contain only one instance of each component chart, since no
    resize can be assumed.

    @method
    */
    initialize: function() {

      var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS, this.base.append('g')).showAsGrid(),
          triangles = this.mixin(charty.CHART_NAMES.TRIANGLE, this.base.append('g')),
          recs = this.mixin(charty.CHART_NAMES.ROUNDED_RECTANGLE, this.base.append('g')),
          texts = this.mixin(charty.CHART_NAMES.TEXT, this.base.append('g'));

      this.componentsMixins = [];
      this.componentsMixins.push(triangles);
      this.componentsMixins.push(recs);
      this.componentsMixins.push(texts);
      this.componentsMixins.push(yxyaxis);

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
    define('linechart',[
      'd3.chart',
      'charty',
      'line',
      'multipledatagroup'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
      });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
	d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LINE_CHART,{
		/**
		Multiple data group initializator.

		Creates N instances of a given mixin.

		@method
		@param {Object} args N = args.instances
		*/
		initialize : function(args){
			var options = {
				chartName : charty.CHART_NAMES.LINE,
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS, this.base.append('g')).showAsGrid(),
					lineChart = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
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
    define('linechartcircles',[
      'd3.chart',
      'charty',
      'multipledatagroup',
      'linechart',
      'multipleinstancesmixin'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
	d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LINE_CHART_CIRCLES,{
		/**
		Line and circles chart initializator.

		@method
		@param {Object} args example = {
                              instances : 2
                          }
		*/
		initialize : function(args){

			var options = {
				chartName : charty.CHART_NAMES.CIRCLE,
				instances : (args.instances || 1)
			};

			var lineChart = this.mixin(charty.CHART_NAMES.LINE_CHART, this.base.append('g'), options),
					circles = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base.append('g'), options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(circles);
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
    define('scatterplot',[
      'd3.chart',
      'charty',
      'circle',
      'multipledatagroup',
      'yxyaxis',
      'multipleinstancesmixin'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {
	d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.SCATTERPLOT, {

		initialize : function(args){
			var options = {
				chartName : charty.CHART_NAMES.CIRCLE,
				instances : (args.instances || 1)
			};

			var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS, this.base.append('g')).showAsGrid(),
          lineChart = this.mixin(charty.CHART_NAMES.MULTIPLE_INSTANCES_MIXIN, this.base, options);

			this.componentsMixins = [];
			this.componentsMixins.push(lineChart);
			this.componentsMixins.push(yxyaxis);
		}
	});
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
          groupedbarchart,
          donutwithinnertext,
          labeleddonutchart,
          linechartcircles

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {

  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('chartsapi',[
        'd3.chart',
        'scalesfactory',
        'barchart',
        'labeledtrianglechart',
        'linechart',
        'scatterplot',
        'donut',
        /*'groupedbarchart',*/
        'donutwithinnertext',
        'linechartcircles'
      ],
      function(d3, ScaleFactory) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, ScaleFactory);
      });
  } else {
    /** Browser globals */
    return factory(d3, ScaleFactory);
  }
}(this, function(d3, ScaleFactory) {
  var ChartsApi = function() {
    this.scaleFactory = new ScaleFactory();
  };

  /**
	Appends a chart to a root d3.selection element. Chart is determined
	by a defined chart name.
	Margin is used to translate the chart a small distance. A chart can have many
	instances.

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
                    }
	@return {Object} d3.chart for data drawing
	*/
  ChartsApi.prototype.chart = function(options) {

    if (!options.root || !options.chartName) {
      throw new Error('Root element or chart name not defined');
    }

    var selection = d3.select(options.root),
        height = (parseInt(selection.style('height'), 10) || 200),
        width  = (parseInt(selection.style('width'), 10) || 200);

    /**
    Sets background image via CSS
    */
    if (options.imgLocation){
      selection.classed(options.imgLocation, true);
    }

    /**
    Set default values for margin, for the svg element.
    */
    var marginValues = {
      left: (options.marginleft || 0),
      top: (options.margintop || 0),
      lfactor: (options.marginlfactor || 1),
      tfactor: (options.margintfactor || 1)
    };

    var svg = selection.append('svg')
      .attr('width', width)
      .attr('height', height);

    svg = svg.append('g')
            .attr('transform', 'translate(' + marginValues.left + ',' + marginValues.top + ')');

    /**
    Chart dimension values are porcentaje from svg adapted value.
    */
    width = (width - marginValues.top) * marginValues.tfactor;
    height = (height - marginValues.left) * marginValues.lfactor;

    /**
    Appends the chart to the specified html element.
    */
    var chart = svg.chart(options.chartName, {
                    instances: options.instances
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

    return chart;
  };

  return ChartsApi;
}));