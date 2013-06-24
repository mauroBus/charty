//CIRCLES CHART
    d3.chart('GenericChart').extend('CirclesChart',{

      initialize : function(){

        this.pathBase = this.base.append('g');

        var x = d3.scale.linear();
        var y = d3.scale.linear();

        var color = d3.scale.category10();

        this.layer('circles', this.pathBase,{
          dataBind: function(d){

            var chart = this.chart();

            x.domain([0,d.linearscalex]).range([0, chart.w]);
            y.domain([0,d.linearscaley]).range([chart.h, 0]);

            return this.selectAll('circle').data(d.data);
          },
          insert : function(){
            return this.append('circle');
          },
          events : {
            'enter' : function(){
              return this.attr('class','dot')
                        .attr("r", 2.5)
                        .attr("cx", function(d) { return x(d.x); })
                        .attr("cy", function(d) { return y(d.y); })
                        .style("fill", function(d) { return color(d.x); });
            },
            'update' : function(){
              return this.attr("cx", function(d) { return x(d.x); })
                        .attr("cy", function(d) { return y(d.y); })
                        .style("fill", function(d) { return color(d.x); });
            },
            'exit' : function(){
              this.remove();
            }
          }
        });
      }
    });