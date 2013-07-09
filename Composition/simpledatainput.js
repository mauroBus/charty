/**
Defines a basic chart to process individual data series

@class SimpleDataInput
@extends BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('BaseChart').extend('SimpleDataInput', {
  /**
  Returns the next element of the data collection

  @method
  @param {Object} data Data accessor
  @return {Object} next element in the collection
  */
  transform : function (data) {
    var top = data.next();
    return top;
  }
});