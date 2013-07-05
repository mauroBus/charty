    //DONUT CHART
    d3.chart('GenericChart').extend("DonutChart", {
      radius : function(newRadius){
        if(arguments.length === 0){
          return this.r;
        }
        this.r = newRadius;
        return this;
      },
      translate : function(){
        this.pathBase.attr("transform", "translate(" + this.w / 2 + "," + this.h / 2 + ")");
        return this;
      },
      initialize : function(){

        this.pathBase = this.base.append('g');

        var pieLayout = d3.layout.pie().sort(null);
        var colorGen = d3.scale.category20();
        var arcGen = d3.svg.arc();

        this.layer('paths', this.pathBase ,{

          dataBind : function(data){
            var chart = this.chart();

            arcGen = arcGen.innerRadius(chart.r - 100)
                           .outerRadius(chart.r - 50);

            return this.selectAll('path').data(pieLayout(data));
          },
          insert : function(){
            return this.append('path');
          },
          events : {
            'exit' : function(){
              return this.remove();
            },
            'merge' : function(){

              var chart = this.chart();

              return this.attr("fill", function(d, i) {
                return colorGen(i);
              }).attr("d", arcGen);
            }
          }
        });
      }
    });