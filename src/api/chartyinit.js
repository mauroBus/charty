/**
Api for chart creation management.

Having the api, it is possible to set a root html element,
and it will append a specific chart to it.

@class ChartsApi
@constructor
@requires d3.chart,
          scalesfactory,
          barchart,
          labeledtrianglechart,
          linechart,
          scatterplot,
          donut,
          donutwithinnertext,
          labeleddonutchart,
          linechartcircles

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {

  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('chartyinit',[
        'datavalidator'
      ],
      function (DataValidator) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(DataValidator);
      });
  } else {
    /** Browser globals */
    root.Charty = factory(DataValidator);
  }
}(this, function (DataValidator) {

  var Charty = function() {
    this.dataValidator = new DataValidator();
  };

  return Charty;
}));