/**
Defines a basic chart to process individual data series

@class SimpleDataGroup
@extends BaseChart
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'd3.chart',
      'charty',
      'basechart'
      ],
      function(d3, charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, charty);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, charty);
  }
}(this, function(d3, charty) {

  d3.chart(charty.CHART_NAMES.BASE_CHART)
    .extend(charty.CHART_NAMES.SIMPLE_DATA_GROUP, {
    /**
    Returns the next element of the data collection

    @method
    @param {Object} data Data Accessor
    @return {Object} next element in the collection
    */
    transform : function (data) {

      return data.next();
    }
  });
}));