/**
Defines a basic chart to process individual data series

@class SimpleDataGroup
@extends BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('BaseChart').extend('SimpleDataGroup', {
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