/**
Chart that can represent many data series 

@class MultipleInstancesMixin
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"  
*/
d3.chart('BaseChart').extend('MultipleInstancesMixin', {
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

    for(var i = options.instances - 1; i >= 0; i--){
      var instance = this.mixin(options.chartName, this.base.append('g'));
      instance.factor = (f--/options.instances);
      this.componentsMixins.push(instance);
    }
  }
});