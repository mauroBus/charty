  //Bars for a bar chart
  d3.chart('GenericChart').extend('Bars',{
    transform : function(data){
      var ordinalscale = data.map(function(d){return d.value});
      var linearscale = this.maxFromFunction(data,function(d){return d.y});

      var newdata = {};
      newdata.ordinalscale = ordinalscale;
      newdata.linearscale = linearscale;
      newdata.data = data;

      return newdata;
    },
    initialize : function(){

      var x = d3.scale.ordinal();
      var y = d3.scale.linear();

      var pathBase = this.base.append('g');

      this.layer('barlayer', pathBase ,{
        dataBind : function(d){

          var chart = this.chart();
          x.domain(d.ordinalscale).rangeBands([0,chart.w],0.1);
          y.domain([0,d.linearscale]).range([chart.h,0]);

          return this.selectAll('rect').data(d.data);

        },
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){

                var chart = this.chart();

                this.attr("class", "bar")
                    .attr("x", function(d) { return x(d.value); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.y); })
                    .attr("height", function(d) { return chart.h - y(d.y); });
                return this;
          },
          'update' : function(){

                var chart = this.chart();

                this.attr("x", function(d) { return x(d.value); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.y); })
                    .attr("height", function(d) { return chart.h - y(d.y); });
                return this;
          },
          'exit' : function(){
            return this.remove();
          }
        }
      });

    }
  });