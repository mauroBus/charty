/**
* Api init for chart creation management.
* 
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