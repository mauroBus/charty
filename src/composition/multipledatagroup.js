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
    define('charty/multipledatagroup',[
      'd3.chart',
      'charty/chartynames',
      'charty/basechart'
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

      /** Default x domain */
      if (this.defaultXDomain){
        this.xscale.setDomain(this.defaultXDomain);
      }
      else{
        this.xscale.calculateDomain(data, function(d){return d.x;});
      }
      this.xscale.setRange(this.w);

      /** Default y domain */
      if (this.defaultYDomain){
        this.yscale.setDomain(this.defaultYDomain);
      }
      else{
        this.yscale.calculateDomain(data, function(d){return d.y;});
      }
      this.yscale.setRange(this.h);

      return data;
    },
    /** 
    Default domain for x scaling

    @method
    @param {Object} domain Array for x domain
    @chainable
    */
    setDefaultXDomain : function (domain){
      this.defaultXDomain = domain;
      return this;
    },
    /** 
    Default domain for y scaling

    @method
    @param {Object} domain Array for y domain
    @chainable
    */
    setDefaultYDomain : function (domain){
      this.setDefaultYDomain = domain;
      return this;
    }
  });
}));