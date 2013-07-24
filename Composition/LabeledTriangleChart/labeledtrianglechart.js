/**
Labeled triangle chart drawer.

@class LabeledTriangleChart
@extends MultipleDataGroup
@constructor
@requires d3,
          d3.chart,
          triangle,
          roundedrectangle,
          textlabel,
          multipleinstancesmixin,
          yxyaxis,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([/*'d3',*/
      'd3.chart',
      'triangle',
      'roundedrectangle',
      'textlabel',
      'multipleinstancesmixin',
      'yxyaxis',
      'multipledatagroup'],
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
  d3.chart('MultipleDataGroup').extend('LabeledTriangleChart', {
    /**
    Labeled triangle constructor.

    Will contain only one instance of each component chart, since no
    resize can be assumed.

    @method
    */
    initialize: function() {

      var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();

      var options1 = {
        instances : 1,
        chartName : 'Triangle'
      };
      var triangles = this.mixin('MultipleInstancesMixin', this.base.append('g'), options1);

      var options2 = {
        instances : 1,
        chartName : 'RoundedRectangle'
      };
      var recs = this.mixin('MultipleInstancesMixin', this.base.append('g'), options2);

      var options3 = {
        instances : 1,
        chartName : 'TextLabel'
      };
      var texts = this.mixin('MultipleInstancesMixin', this.base.append('g'), options3);

      this.componentsMixins = [];
      this.componentsMixins.push(triangles);
      this.componentsMixins.push(recs);
      this.componentsMixins.push(texts);
      this.componentsMixins.push(yxyaxis);

    }
  });
 })
);