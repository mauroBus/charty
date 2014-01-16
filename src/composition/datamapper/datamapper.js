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
* @constructor
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
    define('charty/datamapper',[
      'charty/linearscale',
      'charty/ordinalscale',
      'underscore'
      ],
      function (LinearScale, OrdinalScale, _) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(LinearScale, OrdinalScale, _);
    });
  }
  else {
    /** Browser globals */
    root.DataMapper = factory(LinearScale, OrdinalScale, _);
  }
}(this, function (LinearScale, OrdinalScale, _) {

  /** Class constructor */
  var DataMapper = function (){
    this.scales = [];
  };

  /** 
  * Adds scale for mapping 
  *
  * @method
  * @param {BaseScale} scale Scale to add
  * @param {Boolean} setAsBase Defines a scale that will be taken as base
  * @chainable
  */
  DataMapper.prototype.addScale = function (scale, setAsBase){

    this.baseScale = (setAsBase) ? scale : null;
    this.scales.push(scale);
  };

  /** 
  * Returns the defined base scale.
  *
  * @method
  * @returns {BaseScale} Base scale defined
  */
  DataMapper.prototype.getBaseScale = function (){

    return this.baseScale;
  };

  /** 
  * Maps a data point, according to the defined scales
  * 
  * @method
  * @param {Object} dataElement Data to be mapped
  * @param {Number} chartFactor Factor that affects some chart's drawing
  * @returns {Number} Data position in SVG canvas.
  */
  DataMapper.prototype.map = function (dataElement, chartFactor){

    /** Different scales adds some value to the final position */
    var pos = 0;

    _.each(this.scales, function (scale){
      pos += scale.map(dataElement, chartFactor);
    });

    return pos;
  };

  return DataMapper;

}));