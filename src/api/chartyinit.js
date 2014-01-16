/**
* Api for chart creation management.
* 
* Having the api, it is possible to set a root html element,
* and it will append a specific chart to it.
* 
* @class ChartsApi
* @constructor
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {

  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/chartyinit',
      function () {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory();
      });
  } else {
    /** Browser globals */
    root.Charty = factory();
  }
}(this, function () {

  var Charty = {
  };

  return Charty;
}));