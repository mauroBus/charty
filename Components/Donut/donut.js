/**
Donut drawer

@class Donut
@extends SimpleDataGroup
@constructor
@requires d3,
          underscore,
          d3.chart,
          simpledatagroup

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
        'underscore',
        'd3.chart',
        'simpledatagroup'
      ],
      function(d3, _) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3, _);
      });
  } else {
    // Browser globals
    return factory(d3, _);
  }
}(this, function(d3, _) {
  d3.chart('SimpleDataGroup').extend("Donut", {
    /**
    Donut initialization

    @method
    */
    initialize: function() {

      /**
      Default vaule for inner / outter radius
      */
      var defaults = {
        ir: -150,
        or: -100
      };

      var pathBase = this.base;

      var pieLayout = d3.layout
        .pie()
        .sort(null)
        .value(function(d) {
          return d.x;
        });

      var arcGen = d3.svg.arc();

      this.layer('paths', pathBase, {
        /**
        Data bind for donut.
        Will take x elements as data for drawing
        or : outter radius
        ir : inner radius
        Each part of the donut must have a color set

        @method
        @param {Object} data example = {
                                          ir : -150,
                                          or : -100,
                                          data : [
                                            {x : 200, c: 'red' }
                                            {x : 500, c: 'blue'}
                                          ]
                                        }
        */
        dataBind: function(data) {

          var chart = this.chart();

          chart.ir = data.ir;
          chart.or = data.or;

          if (!_.isNumber(chart.ir) || !_.isNumber(chart.or)) {
            throw new Error('Radius for donut chart must be numerical values');
          }

          arcGen = arcGen.innerRadius(chart.ir || defaults.ir)
            .outerRadius(chart.or || defaults.or);

          return this.selectAll('path').data(pieLayout(data.data));
        },
        /**
        Adds a path element for the donut

        @method
        */
        insert: function() {
          return this.append('path');
        },
        events: {
          'enter': function() {

            var chart = this.chart();

            return this.attr('transform', "translate(" + chart.w / 2 + "," + chart.h / 2 + ")")
              .attr("fill", function(d) {
                return d.data.c;
              })
              .attr("d", arcGen);

          },
          'update': function() {
            var chart = this.chart();
            return this.attr("fill", function(d) {
              return d.data.c;
            })
              .attr("d", arcGen);
          },
          'exit': function() {
            return this.remove();
          }
        }
      });
    }
  });
}));