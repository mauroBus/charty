  //Bars for a bar chart
  //Can take multiple input
  d3.chart('StackedInput').extend('Bars',{
    initialize : function(){

      var pathBase = this.base;

      //Options for layer creation
      var options = {
        dataBind : function(d){

          var chart = this.chart();

          chart.c = d.color;
          chart.x = d.scalex;
          chart.y = d.scaley;

          return this.selectAll('rect').data(d.data);
        },
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){

                var chart = this.chart();

                this.attr("class", chart.c)
                    .attr("x", function(d) { return chart.x(d.x) + ((chart.x.rangeBand() - (chart.x.rangeBand() * chart.l))/2); })
                    .attr("width", chart.x.rangeBand() * chart.l)
                    .attr("y", function(d) { return chart.y(d.y)})
                    .attr("height", function(d) { return chart.h - chart.y(d.y); });
                return this;
          },
          'update' : function(){

                var chart = this.chart();

                this.attr("class", chart.c)
                    .attr("x", function(d) { return chart.x(d.x) + ((chart.x.rangeBand() - (chart.x.rangeBand() * chart.l))/2); })
                    .attr("width", chart.x.rangeBand() * chart.l)
                    .attr("y", function(d) { return chart.y(d.y)})
                    .attr("height", function(d) { return chart.h - chart.y(d.y); });
                return this;
          },
          'exit' : function(){
            return this.remove();
          }
        }
      };

      //Layer creation
      this.layer('barlayer', pathBase.append('g') ,options);

    }
  });