/**
Defines a data transformation for composite charts

@class MultipleDataGroup
@extend BaseChart
@requires d3,
          d3.chart,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'basechart'],
      function(d3) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3);
    });
  }
  else {
    /** Browser globals */
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('BaseChart').extend('MultipleDataGroup',{
    /**
    Data transformation for multiple data series
    Once scales are obtained, they have to be set to the mixins contained

    @method
    @param {Object} data Data accessor
    @return {Object} Data accesor
    */
    transform : function(data){

      this.xscale.calculateDomain(data, function(d){return d.x}).setRange(this.w);
      this.yscale.calculateDomain(data, function(d){return d.y}).setRange(this.h);

      return data;
    }
  });
}));