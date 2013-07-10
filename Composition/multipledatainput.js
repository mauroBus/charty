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
    this.componentsMixins = [];

    var f = options.instances; 

    for(var i = options.instances - 1; i >=0; i--){
      var instance = this.mixin(options.chartName, this.base.append('g'));
      instance.factor = (f--/options.instances);
      this.componentsMixins.push(instance);
    }
  },
  /**
  Propagates height value to all defined mixins

  @method
  @param {Number} newHeight height for all mixins
  @chainable
  */
  height : function(newHeight){
    this.h = newHeight; 
    this.componentsMixins.forEach(function(element){
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
    this.componentsMixins.forEach(function(element){
      element.width(newWidth);
    });
    return this;
  }
});