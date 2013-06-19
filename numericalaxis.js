//LINEAR AXIS CHART
  d3.chart('GenericChart').extend('NumericalAxis',{
    transform : function(data){
      return this.maxFromFunction(data,this.f);
    },
    orient : function(orient){
      this.o = orient;
      return this;
    },
    dataFunc : function(f){
      this.f = f;
      return this;
    },
    translate : function(size){
      this.s = size;
      return this;
    },
    initialize : function(){

      var pathBase = this.base;

      var scale = d3.scale.linear();
      var axis = d3.svg.axis().scale(scale).orient(this.o);

      this.layer('numericalaxis',pathBase, {
        dataBind : function(d){

          var chart = this.chart();
          axis = axis.orient(chart.o);

          if(chart.s){
            scale.domain([0,d[0]]).range([0,chart.w]);
          }
          else{
            scale.domain([0,d[0]]).range([chart.h,0]);
          }

          return this.selectAll('g').data(d);
        },
        insert : function(){
          return this.append('g');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              this.attr('class','axis')
                  .call(axis);

              //X axis will be moved bottom
              if(chart.s){
                this.attr("transform", "translate(0," + chart.s + ")");
              };

              return this;
          },
          'remove' : function(){
            return this.remove();
          }
        }
      });
    }
  });