/**
Labeled Donut Chart. Another custom donut chart.

The main approach is to add specific labels to the
donut chart.

Label position calculation is not done by the chart.
Must be done before calling the draw method, and
coordinates for the label must be present in the data.

Corrections factor should be use in order to set correct
display of the elements inside the label.

@class LabeledDonutChart
@constructor
@extends Donut
@requires d3,
		  d3.chart,
		  donut

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Set up Backbone appropriately for the environment. */
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([/*'d3',*/
      'd3.chart',
      'donut'
    ], function(d3) {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory(d3);
    });
  } else {
    /** Browser globals */
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('Donut').extend('LabeledDonutChart', {
    /**
		Initialize for LabeledDonutChart.

		Each part will be in a different layer, but all of them
		in the same chart.

		@method
    @param {Object} args arguments
  	*/
    initialize: function(args) {

      /**
      Layer Options.

			Layer for the container rounded rectange.
			The label itself, contains the rest of the elements.
			*/
      var outterRectangleOptions = {
        dataBind: function(d) {

          var chart = this.chart();
          chart.rh = d.rh;
          chart.rw = d.rw;
          chart.rc = d.rc;

          return this.selectAll('rect').data(d.data);
        },
        /**
        Appends a svg:rect element.
        */
        insert: function() {
          return this.append('rect');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
              return d.xlabel;
            })
              .attr('y', function(d) {
                return d.ylabel;
              })
              .attr('rx', 15)
              .attr('ry', 15)
              .attr('width', chart.rw)
              .attr('height', chart.rh)
              .attr('fill', chart.rc);
          },
          'update': function() {
            var chart = this.chart();

            return this.attr('x', function(d) {
              return d.xlabel;
            })
              .attr('y', function(d) {
                return d.ylabel;
              });
          },
          'exit': function() {
            return this.remove();
          }
        }
      };

      /**
        Layer Options

  			Circle inside the label.
  			*/
      var innerCircleOptions = {
        dataBind: function(d) {

          var chart = this.chart();

          chart.circleCorrection = (d.circleCorrection || 0.1);
          chart.r = (d.r || 5);

          return this.selectAll('circle').data(d.data);
        },
        insert: function(d) {
          return this.append('circle');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('cx', function(d) {
              return d.xlabel + chart.rw * chart.circleCorrection;
            })
              .attr('cy', function(d) {
                return d.ylabel + (chart.rh / 2);
              })
              .attr('r', chart.r)
              .attr('fill', function(d) {
                return d.c;
              });
          },
          'update': function() {

            var chart = this.chart();

            return this.attr('cx', function(d) {
              return d.xlabel + chart.rw * chart.circleCorrection;
            })
              .attr('cy', function(d) {
                return d.ylabel + (chart.rh / 2);
              })
              .attr('r', chart.r)
              .attr('fill', function(d) {
                return d.c;
              });
          },
          'exit': function() {
            return this.remove();
          }
        }
      };

      /**
			  Layer options

        Label inside the label.
  			*/
      var innerRectangleOptions = {
        dataBind: function(d) {

          var chart = this.chart();

          chart.innerRectangleCorrection = d.innerRectangleCorrection
          chart.innerRectangleColor = d.innerRectangleColor;

          return this.selectAll('rect').data(d.data);
        },
        insert: function() {
          return this.append('rect');
        },
        events: {
          'enter': function() {
            var chart = this.chart();

            return this.attr('x', function(d) {
              return d.xlabel + (chart.rw) - (chart.rw * chart.innerRectangleCorrection);
            })
              .attr('y', function(d) {
                return d.ylabel + (chart.rh / 4);
              })
              .attr('rx', 10)
              .attr('ry', 10)
              .attr('width', chart.rw / 4)
              .attr('height', chart.rh / 2)
              .attr('fill', chart.innerRectangleColor);
          },
          'update': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
              return d.xlabel + (chart.rw) - (chart.rw * chart.innerRectangleCorrection);
            })
              .attr('y', function(d) {
                return d.ylabel + (chart.rh / 4);
              });
          },
          'exit': function() {
            return this.remove();
          }
        }
      };

      /**
        Layer options

        Text inside the outter rectangle, between
        the circle and the inner rectangle.
        */
      var outterRectangleTextOptions = {
        dataBind: function(d) {

          var chart = this.chart();
          chart.outterTextYCorrection = (d.outterTextYCorrection || 0.65);

          return this.selectAll('text').data(d.data);
        },
        insert: function() {
          return this.append('text');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
                return d.xlabel + chart.rw * 0.1 + chart.rw * 0.1;
              })
              .attr('y', function(d) {
                return d.ylabel + chart.rh * chart.outterTextYCorrection;
              })
              .text(function(d) {
                return d.textlabel;
              });
          },
          'update': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
                return d.xlabel + chart.rw * 0.1 + chart.rw * 0.1;
              })
              .attr('y', function(d) {
                return d.ylabel + chart.rh * chart.outterTextYCorrection;
              })
              .text(function(d) {
                return d.textlabel;
              });
          },
          'exit': function() {
            return this.remove();
          }
        }
      };

      /**
      Layer options

      Text inside the inner rectangle of the label.
      */
      var innerRectangleTextOptions = {
        dataBind: function(d) {

          var chart = this.chart();
          chart.innerTextXCorrection = (d.innerTextXCorrection || 0.28);
          chart.innerTextYCorrection = (d.innerTextYCorrection || 0.65);

          return this.selectAll('text').data(d.data);
        },
        insert: function() {
          return this.append('text');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
                        return d.xlabel + (chart.rw) - (chart.rw * chart.innerTextXCorrection);
                      })
                      .attr('y', function(d) {
                        return d.ylabel + chart.rh * chart.innerTextYCorrection;
                      })
                      .text(function(d) {
                        return ((d.x).toString() + '%');
                      });
          },
          'update': function() {

            var chart = this.chart();

            return this.attr('x', function(d) {
                        return d.xlabel + (chart.rw) - (chart.rw * chart.innerTextXCorrection);
                      })
                      .attr('y', function(d) {
                        return d.ylabel + chart.rh * chart.innerTextYCorrection;
                      })
                      .text(function(d) {
                        return ((d.x).toString() + '%');
                      });
          },
          'exit': function() {
            return this.remove();
          }
        }
      };

      /**
        Layers creation

        Drawing is done in the specified layer order.
        */
      this.layer('outterRectangle', this.base.append('g'), outterRectangleOptions);
      this.layer('innerCircle', this.base.append('g'), innerCircleOptions);
      this.layer('innerRectangle', this.base.append('g'), innerRectangleOptions);
      this.layer('outterRectangleText', this.base.append('g'), outterRectangleTextOptions);
      this.layer('innerRectangleText', this.base.append('g'), innerRectangleTextOptions);
    }
  });
}));