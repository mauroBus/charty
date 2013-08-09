/**
Defines a data transformation for composite charts

@class MultipleDataGroup
@extend BaseChart
@requires d3.chart,
          charty,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('multipledatagroup',[
      'd3.chart',
      'charty',
      'basechart'
      ],
      function (d3, Charty) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {
  d3.chart(Charty.CHART_NAMES.BASE_CHART)
    .extend(Charty.CHART_NAMES.MULTIPLE_DATA_GROUP, {
    /**
    Data transformation for multiple data series
    Once scales are obtained, they have to be set to the mixins contained

    @method
    @param {Object} data Data accessor
    @return {Object} Data accesor
    */
    transform : function(data){

      this.xscale.calculateDomain(data, function(d){return d.x;}).setRange(this.w);
      this.yscale.calculateDomain(data, function(d){return d.y;}).setRange(this.h);

      return data;
    }
  });
}));