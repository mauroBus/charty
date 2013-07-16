/**
Circle drawer.

@class Circle
@extends SimpleDataGroup
@constructor
@requires d3,
          underscore,
          d3.chart,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'underscore',
      'd3.chart',
      'simpledatagroup'],
      function(d3, _) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3, _);
    });
  }
  else {
    // Browser globals
    return factory(d3, _);
  }
}(this, function(d3, _) {
  d3.chart('SimpleDataGroup').extend('Circle',{
    /**
    Circle initializator

    @method
    */
    initialize : function(){

      var defaults = {
        r : 5,
        c : 'circle-default'
      };

      var pathBase = this.base.append('g');

      this.layer('circles', pathBase,{
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
        */
        dataBind: function(d){

          var chart = this.chart();
          chart.checkScales('Circle');

          chart.c = d.color;
          chart.r = d.r;

          return this.selectAll('circle').data(d.data);
        },
        insert : function(){
          return this.append('circle');
        },
        events : {
          'enter' : function(){

            var chart = this.chart();

            return this.attr('class',function(d){
                        return (d.c || chart.c || defaults.c);
                      })
                      .attr("r", function(d){
                        if((!_.isNumber(d.r) && !_.isNumber(chart.r))){
                          if(d.r < 0 || chart.r < 0){
                            throw new Error('Circle radius must be a positive number.' );
                          }
                        };
                        return (d.r || chart.r || defaults.r);
                      })
                      .attr("cx", function(d) { return chart.xscale.map(d.x,0); })
                      .attr("cy", function(d) { return chart.yscale.map(d.y,0); });
          },
          'update' : function(){

            var chart = this.chart();

            return this.attr('class',function(d){
                        return (d.c || chart.c || defaults.c);
                      })
                      .attr("r", function(d){
                        if((!_.isNumber(d.r) && !_.isNumber(chart.r))){
                          if(d.r < 0 || chart.r < 0){
                            throw new Error('Circle radius must be a positive number.' );
                          }
                        };
                        return (d.r || chart.r || defaults.r);
                      })
                      .attr("cx", function(d) { return chart.xscale.map(d.x,0); })
                      .attr("cy", function(d) { return chart.yscale.map(d.y,0); });
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