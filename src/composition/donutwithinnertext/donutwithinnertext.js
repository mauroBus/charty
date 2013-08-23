/**
Custom donut chart.
Sets a text inside the donut, showing a text label
with the represented value.

So, this representation will get only one value. The
other one must be calculated (rest).

The problem can't be solved using mixins, since the text position
doesn't depend on the data value.

@class DonutWithInnerText
@constructor
@extends Donut
@requires d3.chart,
          charty,
          donut

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define( 'charty/donutwithinnertext',[
            'd3.chart',
            'charty/chartynames',
            'charty/donut'
            ],
            function (d3, Charty) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(d3, Charty);
    });
  }
  else {
    /** Browser globals */
    factory(d3, Charty);
  }
}(this, function (d3, Charty) {

  d3.chart(Charty.CHART_NAMES.DONUT)
    .extend(Charty.CHART_NAMES.DONUT_INNER_TEXT,{
    initialize : function(args){

      var dataValidator = args.dataValidator,
          errors = {
            invalidFontSize : 'Invalid value : font size must be positive'
          };

      /**
      Defaults for Inner text
      */
      var defaults = {
        fontSize : 55
      };

      var options = {
        /**
        First element will be shown as label.

        Data here will take two elements, since is necessary
        to render two paths for the donut chart.

        The first one is the one that will be shown in label.
        The second one is the rest of the donut.

        @method
        @param {Object} data
        @chainable
        */
        dataBind : function(d){

          var chart = this.chart(),
              data = d.data,
              stringValue = (data[0].y).toString() +'%';

          chart.fontSize = (dataValidator.isPositiveNumber(d.fontSize, errors.invalidFontSize) || defaults.fontSize);
          /** By default, text will be centered inside donut */
          chart.xPosition = (d.xPosition || (chart.w/2));
          chart.yPosition = (d.yPosition || (chart.h/2));

          return this.selectAll('text').data([stringValue]);
        },
        /**
        Inserts one text for the value to display

        @method
        @chainable
        */
        insert : function(){
          return this.append('text');
        },
        events : {
          'enter' : function(){

            var chart = this.chart();

            this.attr('x', chart.xPosition)
                .attr('y', chart.yPosition)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('font-size', chart.fontSize)
                .text(function(d){
                  return d;
                });

            return this;
          },
          'update' : function(){

            this.text(function(d){
              return d;
            });

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
      this.layer('donutText', this.base.append('g'), options);
    }
  });
}));