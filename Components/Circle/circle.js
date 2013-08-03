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
    define([
      'd3.chart',
      'underscore',
      'simpledatagroup'
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
  d3.chart('SimpleDataGroup').extend('Circle',{
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