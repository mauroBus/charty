/**
Implementation map for r2d3 / d3 loading.

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
define({
  'd3impl' : [
    {
      implementation : 'd3',

      isAvailable : function(){
        return true;
      }
    },
    {
      implementation : 'r2d3',

      isAvailable : function(){
        return false;
      }
    }
  ]
});