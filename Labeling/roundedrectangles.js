  //ROUNDED RECTANGLES
  //For chart labeling
    d3.chart('StackedInput').extend('RoundedRectangles',{
    initialize : function(){

      var pathBase = this.base.append('g');

      this.layer('roundedrects', pathBase,{
        dataBind : function(d){

          var chart = this.chart();
          chart.x = d.scalex;
          chart.y = d.scaley;
          chart.rh = d.rh;
          chart.rw = d.rw;
          chart.rc = d.rc;

          return this.selectAll('rect').data(d.data);
        },
        insert : function(){
          return this.append('rect');
        },
        events : {
          'enter' : function(){
            //Width / height set here belong to the rectangle itself

            var chart = this.chart();

            return this.attr('height',chart.rh)
                       .attr('width',chart.rw)
                       .attr('x', function(d){
                          var val = chart.x(d.x)+(chart.x.rangeBand()/2)-(chart.rw/2);
                          return val;
                        })
                       .attr('y',function(d){
                          return chart.y(d.y);
                        })
                       .attr('rx', 5)
                       .attr('ry', 5)
                       .attr('fill',chart.rc);
          },
          update : function(){

            var chart = this.chart();

            return this
                       .attr('x', function(d){
                          var val = chart.x(d.x)+(chart.x.rangeBand()/2)-(chart.rw/2);
                          return val;
                        })
                       .attr('y',function(d){
                          return chart.y(d.y);
                        })
                       .attr('rx', 5)
                       .attr('ry', 5)
                       .attr('fill',chart.rc);
          },
          'exit' : function(){
            return this.remove();
          }
        }
      })
    }
  });