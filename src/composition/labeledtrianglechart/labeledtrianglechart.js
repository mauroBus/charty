/**
Labeled triangle chart drawer.

@class LabeledTriangleChart
@extends MultipleDataGroup
@constructor
@requires d3.chart,
          charty,
          triangle,
          roundedrectangle,
          textlabel,
          multipleinstancesmixin,
          yxyaxis,
          multipledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('labeledtrianglechart',[
      'd3.chart',
      'charty',
      'triangle',
      'roundedrectangle',
      'text',
      'multipleinstancesmixin',
      'yxyaxis',
      'multipledatagroup'
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
  d3.chart(charty.CHART_NAMES.MULTIPLE_DATA_GROUP)
    .extend(charty.CHART_NAMES.LABELED_TRIANGLE_CHART, {
    /**
    Labeled triangle constructor.

    Will contain only one instance of each component chart, since no
    resize can be assumed.

    @method
    */
    initialize: function(args) {

      var yxyaxis = this.mixin(charty.CHART_NAMES.YXY_AXIS,
                              this.base.append('g'),
                              { dataValidator : args.dataValidator }).showAsGrid(),

          triangles = this.mixin(charty.CHART_NAMES.TRIANGLE,
                                this.base.append('g'),
                                args),

          recs = this.mixin(charty.CHART_NAMES.ROUNDED_RECTANGLE,
                            this.base.append('g'),
                            args),

          texts = this.mixin(charty.CHART_NAMES.TEXT,
                            this.base.append('g'),
                            args);

      this.componentsMixins = [];
      this.componentsMixins.push(triangles);
      this.componentsMixins.push(recs);
      this.componentsMixins.push(texts);
      this.componentsMixins.push(yxyaxis);

    }
  });
}));