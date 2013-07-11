/**
Defines a data transformation for composite charts

@class MultipleDataGroup
@extend BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('BaseChart').extend('MultipleDataGroup',{
  /**
  Data transformation for multiple data series
  Once scales are obtained, they have to be set to the mixins contained

  @method
  @param {Object} data Data accessor
  @return {Object} Data accesor
  */
  transform : function(data){

    if(this.xscale.defaultDomain()){
      this.xscale.calculateDomain(data, function(d){return d.x}).setRange(this.w);
      this.yscale.calculateDomain(data, function(d){return d.y}).setRange(this.h);
    }

    var self = this;

    this.componentsMixins.forEach(function(element){
      element.setXScale(self.xscale);
      element.setYScale(self.yscale);
    });

    return data;
  },
});