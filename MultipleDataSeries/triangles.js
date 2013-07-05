  //Triangles as chart
  d3.chart('StackedInput').extend('Triangles',{
    initialize : function(){

      var pathBase = this.base.append('g');

      this.layer('triangles', pathBase , {
        dataBind : function(d){

          var chart = this.chart();
          chart.x = d.scalex;
          chart.y = d.scaley;

          return this.selectAll('path').data(d.data);

        },
        insert : function(){
          return this.insert('path');
        },
        events : {
          'enter' : function(){

            var chart = this.chart();

            return this.attr('class', function(d){
                          return d.c;
                        })
                       .attr('d', function(d){

                          var p = "M "; //sets the starting point of the triangle

                          var x1 = chart.x(d.x); //gets the starting point for x axis
                          var y1 = chart.h;

                          p = p + x1 + " " + y1+" ";

                          var x2 = x1 + chart.x.rangeBand()/2;  //second point
                          var y2 = chart.y(d.y);

                          p = p + "L " + x2 + " " + y2 +" ";

                          var x3 = x1 + chart.x.rangeBand();  //third point
                          var y3 = chart.h;

                          p = p + "L " + x3 + " " + y3;

                          return p;

            });

          },
          'update' : function(){
            var chart = this.chart();

            return this.attr('class', function(d){
                          return d.c;
                        })
                       .attr('d', function(d){

                          var p = "M "; //sets the starting point of the triangle

                          var x1 = chart.x(d.x); //gets the starting point for x axis
                          var y1 = chart.h;

                          p = p + x1 + " " + y1+" ";

                          var x2 = x1 + chart.x.rangeBand()/2;  //second point
                          var y2 = chart.y(d.y);

                          p = p + "L " + x2 + " " + y2 +" ";

                          var x3 = x1 + chart.x.rangeBand();  //third point
                          var y3 = chart.h;

                          p = p + "L " + x3 + " " + y3;

                          return p;

            });
          },
          'exit' : function(){
            return this.remove();
          }
        }
      });
    }
  });