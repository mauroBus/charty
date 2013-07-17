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
@extends
@requires

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
            'd3.chart',
            'donut'], function(d3) {
      // Export global even in AMD case in case this script is loaded with others
      return factory(d3);
    });
  }
  else {
    // Browser globals
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('Donut').extend('DonutWithInnerText',{
    initialize : function(){

      var pathBase = this.base.append('g');

      console.log(this.layer('paths'));

      this.layer('donutText', pathBase, {
        /**
        First element will be shown as label.

        Data here wil take two elements, since is necessary
        to render two paths for the donut chart.

        The first one is the one that will be shown in label.
        The second one is the rest of the donut.

        @method
        @param {Object} data
        @chainable
        */
        dataBind : function(d){
          var data = d.data;

          var stringValue = (data[0].x).toString() +'%';
          console.log(stringValue);
          return this.selectAll('text').data([stringValue]);
        },
        insert : function(){
          return this.append('text');
        },
        events : {
          'enter' : function(){

            var chart = this.chart();

            return this.attr('x', chart.w/2)
                       .attr('y',chart.h/2)
                       .text(function(d){
                        console.log(d);
                        return d;
                       });
          },
          'update' : function(){

          },
          'exit' : function(){
            return this.remove();
          }
        }
      });
    }
  });
 })
);