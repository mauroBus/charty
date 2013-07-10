/**
Basic Axis representation.

Only one X/Y is sufficient for chart drawing, but can
contain more.

@class Axis
@constructor
@extends BaseChart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
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

        if(chart.type === 'x'){  //x axis
          axis = axis.scale(chart.xscale.getScale());
        }
        else{ //y axis
          if(chart.type === 'y'){
            axis = axis.scale(chart.yscale.getScale());
          }
        }

        axis = axis.orient(chart.o);

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
              if(chart.type === 'x'){
                axis = axis.tickSize(-chart.h,0,0);
              }
              else{
                if(chart.type === 'y'){
                  axis = axis.tickSize(-chart.w,0,0);
                }
              }
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