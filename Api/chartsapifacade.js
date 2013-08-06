/**
Facade to the original Api and the names script

@class ChartsApiFacade
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'chartsapi',
      'chartnames'
      ],
      function(ChartsApi, ChartNames) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(ChartsApi, ChartNames);
    });
  }
  else {
    /** Browser globals */
    return factory(ChartsApi, ChartNames);
  }
}(this, function(ChartsApi, ChartNames) {

  var ChartsApiFacade = function(){
    this.api = new ChartsApi();
    this.names = new ChartNames();
  };

  return ChartsApiFacade;
}));