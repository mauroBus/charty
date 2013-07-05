    //CIRCLES CHART
    d3.chart('StackedInput').extend('CirclesChart',{

      initialize : function(){

        this.pathBase = this.base.append('g');

        this.layer('circles', this.pathBase,{
          dataBind: function(d){

            var chart = this.chart();

            chart.x = d.scalex;
            chart.y = d.scaley;
            chart.c = d.color;

            chart.r = d.r;  //Circle radius

            return this.selectAll('circle').data(d.data);
          },
          insert : function(){
            return this.append('circle');
          },
          events : {
            'enter' : function(){

              var chart = this.chart();

              var scalex = chart.x;

              return this.attr('class',chart.c)
                        .attr("r", function(d){
                          if(d.r){
                            return d.r;
                          }
                          return chart.r;
                        })
                        .attr("cx", function(d) { return chart.getScaledValue(scalex,d.x); })
                        .attr("cy", function(d) { return chart.y(d.y); });
            },
            'update' : function(){

              var chart = this.chart();

              var scalex = chart.x;

              return this.attr('class',chart.c)
                        .attr("r", function(d){
                          if(d.r){
                            return d.r;
                          }
                          return chart.r;
                        })
                        .attr("cx", function(d) { return chart.getScaledValue(scalex,d.x); })
                        .attr("cy", function(d) { return chart.y(d.y); });
            },
            'exit' : function(){
              return this.remove();
            }
          }
        });
      }
    });