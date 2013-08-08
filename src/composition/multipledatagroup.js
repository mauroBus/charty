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
    .extend(charty.CHART_NAMES.MULTIPLE_DATA_GROUP, {
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