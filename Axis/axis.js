//LINEAR AXIS CHART
  d3.chart('GenericChart').extend('Axis',{
    showAsGrid : function(val){
      //true or false
      this.grid = val;
      return this;
    },
    orient : function(orient){
      this.o = orient;
      return this;
    },
    xtranslate : function(t){
      this.xt = t;
      return this;
    },
    ytranslate : function(t){
      this.yt = t;
      return this;
    },
    axistype : function(type){  //Can be y or x axis
      //Should be "x" or "y"
      this.type = type;
      return this;
    },
    initialize : function(){

      this.xt = 0;
      this.yt = 0;

      var pathBase = this.base;

      var axis = d3.svg.axis();

      this.layer('axis',pathBase, {
        dataBind : function(d){

          var chart = this.chart();

          if(chart.type === 'x'){  //x axis
            var scale = d.scalex;
            axis = axis.scale(d.scalex);
          }
          else{ //y axis
            if(chart.type === 'y'){
              var scale = d.scaley;
              axis = axis.scale(d.scaley);
            }
          }

          axis = axis.orient(chart.o);

          return this.selectAll('g').data([0]);
        },
        insert : function(){
          return this.append('g');
        },
        events : {
          'merge' : function(){

              var chart = this.chart();

              if(chart.grid){
                if(chart.type === 'x'){
                  axis = axis.tickSize(-chart.w,0,0);
                }
                else{
                  if(chart.type === 'y'){
                    axis = axis.tickSize(-chart.h,0,0);
                  }
                }
              }

              this.attr('class','axis')
                  .call(axis);

              //axis will be moved in x/y direction
              if(chart.xt !== 0 || chart.yt !== 0){
                this.attr("transform", "translate("+chart.xt+"," + chart.yt + ")");
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