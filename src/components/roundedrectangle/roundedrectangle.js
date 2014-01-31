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
    define('charty/roundedrectangle',[
      'd3.chart',
      'charty/chartynames',
      'charty/simpledatagroup'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
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
    * Rounded rectangle initialization.
    *
    * @constructor
    * @param {Object} args Arguments for rounded rectangles component.
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
      * Defaults for rectangle
      *
      * rh : rectangle height
      * rw : rectangle width
      * rc : rectangle color
      * rx, ry : value for rounded corners
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
        * Appends a svg:rect element.
        *
        * @method insert
        * @chainable
        */
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){
            this.chart().eventManager.bindAll(this);

            return this;
          },
          'merge' : function (){
            /** Click event only on enter */
            var chart = this.chart();

            this.attr('height', chart.rh)
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

            return this;
          },
          'exit' : function(){
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