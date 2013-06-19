    //Ordinal axis -> uses discrete values, instead of a linear scale
    d3.chart('GenericChart').extend('OrdinalAxis',{

      transform : function(data){
        var result = data.map(function(d){return d.value});
        var newdata = [];
        newdata[0] = result;
        return newdata;
      },
      initialize : function(){

        var pathBase = this.base.append('g');

        var x = d3.scale.ordinal();
        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        this.layer('ordinal', pathBase, {
          dataBind : function(d){
            var chart = this.chart();
            x.domain(d[0]).rangeRoundBands([0, chart.w], .1);
            return this.selectAll('g').data(d);
          },
          insert : function(){
              var app = this.append('g');
              return app;
          },
          events : {
            'merge' : function(){

                var chart = this.chart();

                this.attr("class", "axis")
                    .attr("transform", "translate(0," + chart.w + ")")
                    .call(xAxis);

                return this;
            },
            'exit' : function(){
                return this.remove();
            }
          }
        });
      }
    });