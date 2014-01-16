/**
* Implementation map for r2d3 / d3 loading.
* 
* This implementation is assuming that the html tag will
* contain a 'lt-ie9' class, in case of ie8. 
* 
* @class  Dynamic
* @requires jquery
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
define(['jquery'], function($){

    var impl = {
      'd3impl' : [
        {
          implementation : 'd3',

          isAvailable : function(){
            return !($('html').hasClass('lt-ie9'));
          }
        },
        {
          implementation : 'r2d3',

          isAvailable : function(){
            return $('html').hasClass('lt-ie9');
          }
        }
      ]
    };

    return impl;
});