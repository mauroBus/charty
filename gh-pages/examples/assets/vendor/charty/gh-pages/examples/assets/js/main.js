/**
* Main Application
*
* Testing chart drawing and data update
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
require.config({
  paths : {
    /** Libraries */
    'd3'                      : '../vendor/d3/d3.min',
    'r2d3'                    : '../vendor/r2d3/r2d3.min',
    'd3.chart'                : '../vendor/d3.chart/d3.chart.min',
    'underscore'              : '../vendor/underscore/underscore-min',
    'feature'                 : '../vendor/feature/feature',
    'jquery'                  : '../vendor/jquery/jquery.min',
    'bootstrap'               : '../vendor/bootstrap/dist/js/bootstrap.min',
    'charty/charty'           : '../vendor/charty/dist/charty.min',

    /** Conditional loading */
    'implementations'         : 'dynamic',

    /** Examples */
    'horizontalbarchart'      : '../charts/horizontalbarchart',
    'verticalbarchart'        : '../charts/verticalbarchart',
    'donutinnertext'          : '../charts/donutinnertext',
    'groupedbarchart'         : '../charts/groupedbarchart',
    'labeledtrianglechart'    : '../charts/labeledtrianglechart',
    'linechart'               : '../charts/linechart',
    'linecirclechart'         : '../charts/linecirclechart',
    'scatterplot'             : '../charts/scatterplot',
    'winlossbarchart'         : '../charts/winlossbarchart'
  },
  shim:{
    'jquery' : {
      exports : '$'
    },
    'bootstrap' : {
      deps : ['jquery'],
      exports : '$'
    },
    'underscore' : {
      exports : '_'
    },
    'r2d3' : {
      exports : 'd3'
    },
    'd3' : {
      exports :'d3'
    },
    'd3.chart' : {
      deps : ['feature!d3impl'],
      exports : 'd3'
    }
  }
});

requirejs(
  [
  'horizontalbarchart',
  'verticalbarchart',
  'donutinnertext',
  'groupedbarchart',
  'labeledtrianglechart',
  'linechart',
  'linecirclechart',
  'scatterplot',
  'winlossbarchart'
  ],
function(){
  /** Keep going, nothing to see here */
});
