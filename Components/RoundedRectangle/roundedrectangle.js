/**
Rounded rectangle drawer.

@class RoundedRectangle
@constructor
@extends SimpleDataGroup
@requires d3,
          underscore,
          d3.chart,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([/*'d3',*/
      'd3.chart',
      'underscore',
      /*'d3.chart',*/
      'simpledatagroup'],
      function(d3, _) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, _);
    });
  }
  else {
    // Browser globals
    return factory(d3, _);
  }
}(this, function(d3, _) {
  d3.chart('SimpleDataGroup').extend('RoundedRectangle',{
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

          chart.rh = d.rh;
          chart.rw = d.rw;
          chart.rc = d.rc;
          chart.rx = d.rx;
          chart.ry = d.ry;

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
          'enter' : function(){

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

            return this.attr('height', (chart.rh || defaults.rh))
                       .attr('width', (chart.rw || defaults.rw))
                       .attr('x', function(d){
                          var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                          return val;
                        })
                       .attr('y',function(d){
                          return chart.yscale.map(d.y)-(chart.rh/2);
                        })
                       .attr('rx', defaults.rx)
                       .attr('ry', defaults.ry)
                       .attr('fill',function(d){
                          return (d.rc ||chart.rc || defaults.rc);
                       });
          },
          update : function(){

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

            return this.attr('height', (chart.rh || defaults.rh))
                       .attr('width', (chart.rw || defaults.rw))
                       .attr('x', function(d){
                          var val = chart.xscale.map(d.x,1)+(chart.xscale.band(1)/2)-(chart.rw/2);
                          return val;
                        })
                       .attr('y',function(d){
                          return chart.yscale.map(d.y)-(chart.rh/2);
                        })
                       .attr('rx', defaults.rx)
                       .attr('ry', defaults.ry)
                       .attr('fill',function(d){
                          return (d.rc || chart.rc || defaults.rc);
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
 })
);