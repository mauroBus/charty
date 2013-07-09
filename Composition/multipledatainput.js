/**
Chart that can represent many data series 

@class MultipleDataInput
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"  
*/
d3.chart('BaseChart').extend('MultipleDataInput', {
  /**
  Creates multiple mixin instances of a specific chart.
  It is necessary to set the instances count
  and the chart name. 

  @method
  @param {Object} options example = {
                                      instances : 2,
                                      chartName : 'Bar'
                                    }
  */
  initialize : function(options){
    this.mixinsInstances = [];

    var f = options.instances; 

    for(var i = options.instances - 1; i >=0; i--){
      var instance = this.mixin(options.chartName, this.base.append('g'));
      instance.factor = (f--/options.instances);
      this.mixinsInstances.push(instance);
    }
  },
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

    this.mixinsInstances.forEach(function(element){
      element.setXScale(self.xscale);
      element.setYScale(self.yscale);
    });

    return data;
  },
  /**
  Propagates height value to all defined mixins

  @method
  @param {Number} newHeight height for all mixins
  @chainable
  */
  height : function(newHeight){
    this.h = newHeight; 
    this.mixinsInstances.forEach(function(element){
      element.height(newHeight);
    });
    return this;
  },
  /**
  Propagates width value to all defined mixins

  @method
  @param {Number} newWidth width for all mixins
  @chainable
  */
  width : function(newWidth){
    this.w = newWidth; 
    this.mixinsInstances.forEach(function(element){
      element.width(newWidth);
    });
    return this;
  }
});