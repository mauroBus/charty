/**
Defines a data transformation for composite charts

@class MultipleDataGroup
@extend BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'd3.chart',
      'basechart'], 
      function(d3) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3);
    });
  }
  else {
    // Browser globals
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

      var self = this;

      this.componentsMixins.forEach(function(element){
        element.setXScale(self.xscale);
        element.setYScale(self.yscale);
      });

      return data;
    },
  });
 })
)