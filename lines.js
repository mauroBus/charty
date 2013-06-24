//Lines for a line chart
d3.chart('GenericChart').extend('Lines', {
      initialize : function(){

        var line = d3.svg.line();

        var x = d3.scale.linear();
        var y = d3.scale.linear();

        var line = d3.svg.line()
                         .x(function(d) { return x(d.x); })
                         .y(function(d) { return y(d.y); });

        var pathBase = this.base;

        this.layer('lineslayer', pathBase, {
          dataBind : function(d){

            var chart = this.chart();

            x.domain([0,d.linearscalex]).range([0, chart.w]);
            y.domain([0,d.linearscaley]).range([chart.h,0]);

            chart.data = d.data;

            return this.selectAll('g').data([0]);
          },
          insert : function(){
            return this.append('g');
          },
          events : {
            'merge' : function(){

                var chart = this.chart();

                //It's computed using datum instead of data
                //Similar case to axis
                //Added to a svg:g

                return this.append('path')
                           .datum(chart.data)
                           .attr('class','line')
                           .attr('d',line);
            },
            'exit' : function(){
              return this.remove();
            }
          }
        });
      }

    });