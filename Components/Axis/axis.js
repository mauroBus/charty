/**
Basic Axis representation.

Only one X/Y is sufficient for chart drawing, but can
contain more.

@class Axis
@constructor
@extends BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'd3.chart',
      'basechart'], 
      function(d3) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3);
    });
  }
  else {
    // Browser globals
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('BaseChart').extend('Axis',{
    /**
    Basic Axis initialization

    @method
    */
    initialize : function(){

      this.xt = 0;
      this.yt = 0;

      var pathBase = this.base;

      var axis = d3.svg.axis();

      this.layer('axis',pathBase, {
        /**
        Data bind for axis
        Since axis requires just a scale, only one element
        will be set for the data selection

        @method
        @param {Object} d
        */
        dataBind : function(d){

          var chart = this.chart();

          axis = axis.scale(chart.scale.getScale())
                     .orient(chart.o);

          return this.selectAll('g').data([0]);
        },
        /**
        Insert for axis. Just inserts one svg:g
        element.

        @method
        */
        insert : function(){
          return this.append('g');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              if(chart.grid){
                  axis = axis.tickSize(-chart.tsize,0,0);
              }

              this.attr('class','axis')
                  .call(axis);

              if(chart.xt !== 0 || chart.yt !== 0){
                this.attr("transform", "translate("+chart.xt+"," + chart.yt + ")");
              };

              return this;
          },
          'remove' : function(){
            return this.remove();
          }
        }
      });
    },
    /**
    Sets tick size for the axis

    @method
    @param {Number} size ticksize
    @chainable
    */
    tickSize : function(size){
      this.tsize = size;
      return this; 
    },
    /**
    Sets the scale that will be used for the axis

    @method
    @param {Object} d3.scale
    @chainable
    */
    setScale : function(scale){
      this.scale = scale;
      return this; 
    },
    /**
    Shows the axis as a grid

    @method
    @param {Boolean} val true/false value
    @chainable
    */
    showAsGrid : function(val){
      this.grid = val;
      return this;
    },
    /**
    Sets axis orientation

    @method
    @param {String} orient
    @chainable
    */
    orient : function(orient){
      this.o = orient;
      return this;
    },
    /**
    Sets x translation for axis.

    @method
    @param {Number} t tranlation value
    @chainable
    */
    xtranslate : function(t){
      this.xt = t;
      return this;
    },
    /**
    Sets y translation for axis.

    @method
    @param {Number} t tranlation value
    @chainable
    */
    ytranslate : function(t){
      this.yt = t;
      return this;
    },
    /**
    Sets axis type. Must be 'x' or 'y'

    @method
    @param {String} type axis type
    @chainable
    */
    axistype : function(type){
      this.type = type;
      return this;
    }
  });
 })
)