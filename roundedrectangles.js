  //ROUNDED RECTANGLES
  //For chart labeling
    d3.chart('GenericChart').extend('RoundedRectangles',{
    /*transform : function(data){
      var newdata = {};

      var ordinalx = data.map(function(d){return d.value});
      var maxY = this.maxFromFunction(data , function(d){return d.y});

      newdata.data = data;
      newdata.y = maxY[0];
      newdata.x = ordinalx;

      return newdata;
    },*/
    initialize : function(){

      var pathBase = this.base.append('g');

      var x = d3.scale.ordinal();
      var y = d3.scale.linear();

      this.layer('roundedrects', pathBase,{
        dataBind : function(d){

          var chart = this.chart();

          x.domain(d.ordinalscale).rangeRoundBands([0, chart.w], .1);
          y.domain([0,d.linearscaley]).range([chart.h,0]);

          return this.selectAll('rect').data(d.data);
        },
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){
            //Width / height set here belong to the rectangle itself

            var rectheight = 15;
            var rectwidht = 15;

            return this.attr('height',rectheight)
                       .attr('width',rectwidht)
                       .attr('x', function(d){
                          var val = x(d.value)+(x.rangeBand()/2)-(rectwidht/2);
                          return val;
                        })
                       .attr('y',function(d){return y(d.y)-rectheight})
                       .attr('rx', 5)
                       .attr('ry', 5)
                       .attr('fill','gray');
          },
          update : function(){
            return this.attr('x', function(d){
                          var val = x(d.value)+(x.rangeBand()/2)-(rectwidht/2);
                          return val;
                        })
                       .attr('y',function(d){return y(d.y)-rectheight});
          },
          'exit' : function(){
            return this.remove();
          }
        }
      })
    }
  });