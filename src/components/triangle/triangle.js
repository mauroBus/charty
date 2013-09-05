/**
Triangle drawer.

@class Triangle
@constructor
@extends SimpleDataGroup
@requires d3.chart,
          charty,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/triangle',[
      'd3.chart',
      'charty/chartynames',
      'underscore',
      'charty/simpledatagroup'
      ],
      function (d3, Charty, _) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(d3, Charty, _);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty, _);
  }
}(this, function (d3, Charty, _) {
  d3.chart(Charty.CHART_NAMES.SIMPLE_DATA_GROUP)
    .extend(Charty.CHART_NAMES.TRIANGLE, {
    /**
    Triangle initialization

    @method
    */
    initialize : function(){

      /**
      c : triangle color
      */
      var defaults = {
        c : 'triangle-default'
      };

      var options = {
        /**
        Data bind for a triangle serie.
        Will set a color for the whole serie.

        @method
        @param {Object} d example = {
                                      color : 'red',
                                      data : [
                                        {x : 'Jun', y : 200 , c:'blue'},
                                        ...
                                      ]
                                    }
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart();

          chart.c = (d.c || defaults.c);
          chart.clickEvent = d.clickEvent;

          return this.selectAll('path').data(d);

        },
        /**
        Appends a svg:path

        @method
        @chainable
        */
        insert : function(){
          return this.append('path');
        },
        events : {
          'merge' : function(){

            var chart = this.chart();

            this.attr('class', function(d){
                  return (d.c || chart.c);
                })
                .attr('d', function(d){
                  return chart.getPath(d);
                });

            if (chart.clickEvent){
              this.on('click', chart.clickEvent);
            }

            return this;
          },
          'exit' : function(){

            return this.remove();
          }
        }
      };

      /**
      Layer creation
      */
      this.layer('triangles', this.base.append('g') , options);
    },
    /**
    Path is defined as a string connecting different
    data, visualized as dots.

    @method
    @param {Object} d
    @return {String} path
    */
    /*getPath : function(d, y1, band){

      var x1 = this.xscale.map(d.x,1);

      return  ('M ' + x1 + ' ' + y1 +
              ' L ' + (x1 + band/2) + ' ' + this.yscale.map(d.y) +
              ' L ' + (x1 + band) + ' ' + y1);
    }*/
    /**
    Transform must be redefined in order to
    separate a triangle in two constituting parts

    @method
    @param {Object} data Data Acccessor
    @return {Object} already mapped values for each datapoint
    */
    transform : function(data){
      var result = [],
          dataArray = data.next().data,
          self = this,
          xBand = this.xscale.band(1),
          zeroY = this.yscale.map(0);

      _.each(dataArray, function (element){
        var x1 = self.xscale.map(element.x,1),
            x2 = x1 + (xBand/2),
            x3 = x1 + xBand,
            y1 = zeroY,
            y2 = self.yscale.map(element.y);

          result.unshift({x1 : x1, y1: y1, x2 : x2, y2 : y2, x3 : x2, y3 : y1, c: element.c1});
          result.unshift({x1 : x2, y1: y1, x2 : x2, y2 : y2, x3 : x3, y3 : y1, c: element.c2});
      });
      return result;
    },
    /**
    Path is defined as a string connecting different
    data, visualized as dots.

    @method
    @param {Object} d Data point
    @return {String} path
    */
    getPath : function(d){
      return ('M '+ d.x1 + ' ' + d.y1 + ' L ' + d.x2 +' ' + d.y2 + ' L '+ d.x3 + ' ' + d.y3);
    }
  });
}));