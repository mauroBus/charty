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
    'd3'                      : '../../../vendor/d3/d3.min',
    'r2d3'                    : '../../../vendor/r2d3/r2d3',
    'd3.chart'                : '../../../vendor/d3.chart/d3.chart.min',
    'underscore'              : '../../../vendor/underscore/underscore-min',
    'feature'                 : '../../../vendor/feature/feature',
    'jquery'                  : '../../../vendor/jquery/jquery.min',
    'bootstrap'               : '../../../vendor/bootstrap/dist/js/bootstrap.min',
    'charty/charty'           : '../../../dist/charty',

    /** Conditional loading */
    'implementations'         : 'dynamic',

    /** Examples */
    'barchart'                : '../../charts/barchart',
    'donutinnertext'          : '../../charts/donutinnertext',
    'groupedbarchart'         : '../../charts/groupedbarchart',
    'labeledtrianglechart'    : '../../charts/labeledtrianglechart',
    'linechart'               : '../../charts/linechart',
    'linecirclechart'         : '../../charts/linecirclechart',
    'scatterplot'             : '../../charts/scatterplot'
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
  'barchart',
  'donutinnertext',
  'groupedbarchart',
  'labeledtrianglechart',
  'linechart',
  'linecirclechart',
  'scatterplot'
  ],
function(){
  /** Keep going, nothing to see here */
});
