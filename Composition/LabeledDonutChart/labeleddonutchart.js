/**
Labeled Donut Chart. Another custom donut chart.

The main approach is to add specific labels to the 
donut chart.

Label position calculation is not done by the chart. 
Must be done before calling the draw method, and 
coordinates for the label must be present in the data. 

@class LabeledDonutChart
@constructor
@extends Donut
@requires d3,
		  d3.chart,
		  donut

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
            'd3.chart',
            'donut'], function(d3) {
      // Export global even in AMD case in case this script is loaded with others
      return factory(d3);
    });
  }
  else {
    // Browser globals
    return factory(d3);
  }
}(this, function(d3) {
  	d3.chart('Donut').extend('LabeledDonutChart', {
  	/**
		Initialize for LabeledDonutChart.

		Each part will be in a different layer, but all of them
		in the same chart.

		@method
  		*/
  		initialize : function(args){

  			/**
        Layer Options.

  			Layer for the container rounded rectange.
  			The label itself, contains the rest of the elements. 
  			*/

        var outterRectangleOptions = {
          dataBind : function(d){

            var chart = this.chart(); 
            chart.rh = d.rh;
            chart.rw = d.rw; 
            chart.rc = d.rc;

            return this.selectAll('rect').data(d.data); 
          },
          insert : function(){
            return this.append('rect'); 
          },
          events : {
            'enter' : function(){

              var chart = this.chart(); 

              return this.attr('x',function(d){
                      return d.xlabel;
                    })
                    .attr('y',function(d){
                      return d.ylabel;
                    })
                    .attr('rx',15)
                    .attr('ry',15)
                    .attr('width', chart.rw)
                    .attr('height', chart.rh)
                    .attr('fill', chart.rc); 
            },
            'update' : function(){
              var chart = this.chart(); 

              return this.attr('x',function(d){
                      return d.xlabel;
                    })
                    .attr('y',function(d){
                      return d.ylabel;
                    })
            },
            'exit' : function(){
              return this.remove(); 
            }
          }
        }; 
  			
  			/**
        Layer Options

  			Circle inside the label. 
  			*/
        var innerCircleOptions = {
          dataBind : function(d){
            return this.selectAll('circle').data(d.data);
          },
          insert : function(d){
            return this.append('circle'); 
          },
          events : {
            'enter' : function(){

              var chart = this.chart(); 

              return this.attr('cx', function(d){
                      return d.xlabel + (d.xlabel*0.15); 
                    })
                    .attr('cy', function(d){
                      return d.ylabel + (chart.rh/2); 
                    })
                    .attr('r',5)
                    .attr('fill', function(d){
                      return d.c; 
                    })
            },
            'update' : function(){
              return this.attr('cx', function(d){
                      return d.xlabel + (d.xlabel/2); 
                    })
                    .attr('cy', function(d){
                      return d.ylabel + (chart.rh/2); 
                    })
                    .attr('fill', function(d){
                      return d.c; 
                    })
            },
            'exit' : function(){
              return this.remove(); 
            }
          }
        };

  			/**
			  Layer options

        Label inside the label. 
  			*/
        var innerRectangleOptions = {
          dataBind : function(d){
            return this.selectAll('rect').data(d.data);
          },
          insert : function(){
            return this.append('rect');
          },
          events : {
            'enter':function(){
              var chart = this.chart(); 

              return this.attr('x',function(d){
                      return d.xlabel + (chart.rw*0.3);
                    })
                    .attr('y',function(d){
                      return d.ylabel + (chart.rh/4);
                    })
                    .attr('rx',15)
                    .attr('ry',15)
                    .attr('width', chart.rw/2)
                    .attr('height', chart.rh/2)
                    .attr('fill', 'white');
            },
            'update':function(){
              return this.attr('x',function(d){
                      return d.xlabel + (chart.rw*0.3);
                    })
                    .attr('y',function(d){
                      return d.ylabel + (chart.rh/4);
                    }); 
            },
            'exit' : function(){
              return this.remove(); 
            }
          }
        }; 

        /**
        Layers creation
        */
        this.layer('outterRectangle', this.base.append('g'), outterRectangleOptions); 
        this.layer('innerCircle', this.base.append('g'), innerCircleOptions);
  			this.layer('innerRectangle', this.base.append('g'), innerRectangleOptions); 

  		}
  	});
  })
); 