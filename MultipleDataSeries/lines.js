//Lines for a line chart
d3.chart('StackedInput').extend('Lines', {
      initialize : function(){

        var line = d3.svg.line();

        var pathBase = this.base;

        this.layer('lineslayer', pathBase, {
          dataBind : function(d){

            var scalex = d.scalex;
            var scaley = d.scaley;

            var chart = this.chart();

            line.x(function(d) {
              return chart.getScaledValue(scalex,d.x);
            }).y(function(d) {
              return chart.getScaledValue(scaley,d.y);
            });

            chart.datum = d.data;
            chart.c = d.color;

            return this.selectAll('path').data([0]);

          },
          insert : function(){
            return this.append('path');
          },
          events : {
            'enter' : function(){

                var chart = this.chart();

                //It's computed using datum instead of data
                //Similar case to axis
                //Added to a svg:g

                return this.datum(chart.datum)
                           .attr('class',chart.c)
                           .attr('d',line);
            },
            'update':function(){

              var chart = this.chart();

              return this.datum(chart.datum)
                         .attr('class',chart.c)
                         .attr('d',line);
            },
            'exit' : function(){
              return this.remove();
            }
          }
        });
      }

    });