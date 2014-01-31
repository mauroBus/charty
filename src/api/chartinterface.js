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
    define('charty/chartinterface',[
      'charty/accessor',
      'charty/eventmanager',
      'charty/eventfactory',
      'underscore'
      ],
      function (Accessor, EventManager, EventFactory, _) {
      /** Export global even in AMD case in case this script
      * is loaded with others */
      return factory(Accessor, EventManager, EventFactory, _);
    });
  }
  else {
    /** Browser globals */
    root.ChartInterface = factory(Accessor, EventManager, EventFactory, _);
  }
}(this, function (Accessor, EventManager, EventFactory, _) {

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
  var ChartInterface = function(chart, rootSelection, svg, gSvg, eventFactory){

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
  *                        lfactor = 0.9,
  *                        tfactor = 0.9
  *                      }
  */
  ChartInterface.prototype.setDimensions = function (margin, width, height){
    /** Defaults margin values */
    var marginValues = {
      left : 0,
      top : 0,
      lfactor : 1,
      tfactor : 1
    };

    /** Values are taken from root element, by parameter or by default */
    var svgHeight = (height || parseInt(this.rootSelection.style('height'), 10) || 200),
        svgWidth  = (width || parseInt(this.rootSelection.style('width'), 10) || 200);

    /** svg element dimensioning */
    this.svg.attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('viewBox', ('0 0 '+ svgWidth + " " + svgHeight))
        .attr('preserveAspectRatio', 'XminYmin');

    if (margin){
      marginValues = {
        left: (margin.marginleft || 0),
        top: (margin.margintop || 0),
        lfactor: (margin.marginlfactor || 1),
        tfactor: (margin.margintfactor || 1)
      };

      /** Translating g element */
      this.gSvg.attr('transform', 'translate(' + marginValues.left + ',' + marginValues.top + ')');
    }

    /** Calculating values according to margin values */
    svgWidth = svgWidth * marginValues.lfactor;
    svgHeight = svgHeight * marginValues.tfactor;

    /** Propagate value to chart*/
    this.chart.height(svgHeight).width(svgWidth);
  };

  /**
  * Interface to the chart drawing stage
  *
  * @method draw
  * @param {Object} dataArray Data series contained in one array
  * @param {Object} eventsArray Events to be attached to data elements
  * @chainable
  */
  ChartInterface.prototype.draw = function(dataArray, eventsArray){

    var eventManager = new EventManager(),
        self = this;

    /** Adding events to manager */
    _.each(eventsArray, function (e){
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
  ChartInterface.prototype.redimension = function(height, width){

    var rootHeight = (height || parseInt(this.rootSelection.style('height'), 10)),
        rootWidth  = (width || parseInt(this.rootSelection.style('width'), 10)),
        svgHeight  = (parseInt(this.svg.style('height'), 10)),
        svgWidth   = (parseInt(this.svg.style('width'), 10));

    /** Sets new dimensions and resizing happens */
    if ((rootHeight !== svgHeight) || (rootWidth !== svgWidth)){

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
  ChartInterface.prototype.setBackgroundImage = function (imgClass){

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
  ChartInterface.prototype.removeBackgroundImage = function (){
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
  ChartInterface.prototype.setTitle = function (title, xPosition, yPosition){

    this.svg.append('text')
            .attr('x', xPosition || 0)
            .attr('y', yPosition || 30)
            .text(title);

    return this;
  };

  return ChartInterface;
}));