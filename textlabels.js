d3.chart('GenericChart').extend('TextLabels', {
  initialize : function(){

    var pathBase = this.base.append('g');

    var x = d3.scale.ordinal();
    var y = d3.scale.linear();

    this.layer('texts', pathBase ,{
      dataBind : function(d){

        var chart = this.chart();

        x.domain(d.ordinalscale).rangeRoundBands([0, chart.w], .1);
        y.domain([0,d.linearscaley]).range([chart.h,0]);

        return this.selectAll('text').data(d.data);
      },
      insert : function(){
        return this.append('text');
      },
      events : {
        'enter' : function(){

            var rectheight = 15;
            var rectwidht = 15;

            return this.attr('x', function(d){
                          var val = x(d.value)+(x.rangeBand()/2);
                          return val;
                        })
                       .attr('y', function(d){return y(d.y)})
                       .attr("text-anchor", "middle")
                       .text(function(d) { return d.y; });
        },
        'update' : function(){
            return this.attr('x', function(d){
                          var val = x(d.value)+(x.rangeBand()/2);
                          return val;
                        })
                       .attr('y', function(d){return y(d.y)})
                       .attr("text-anchor", "middle")
                       .text(function(d) { return d.y; });
        },
        'exit' : function(){
          return this.remove();
        }
      }
    });

  }
})