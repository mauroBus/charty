d3.chart('StackedInput').extend('TextLabels', {
  initialize : function(){

    var pathBase = this.base.append('g');

    this.layer('texts', pathBase ,{
      dataBind : function(d){

        var chart = this.chart();
        chart.x = d.scalex;
        chart.y = d.scaley;

        return this.selectAll('text').data(d.data);
      },
      insert : function(){
        return this.append('text');
      },
      events : {
        'enter' : function(){

            var chart = this.chart();

            var rectheight = 15;
            var rectwidht = 15;

            return this.attr('x', function(d){
                          var val = chart.x(d.x)+(chart.x.rangeBand()/2);
                          return val;
                        })
                       .attr('y', function(d){
                          return chart.y(d.y)+rectheight;
                        })
                       .attr("text-anchor", "middle")
                       .text(function(d) { return d.y; });
        },
        'update' : function(){

            var chart = this.chart();

            return this.attr('x', function(d){
                          var val = chart.x(d.x)+(chart.x.rangeBand()/2);
                          return val;
                        })
                       .attr('y', function(d){return chart.y(d.y)})
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