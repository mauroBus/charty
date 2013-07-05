    //Scatterplot chart
    d3.chart('GenericChart').extend('Scatterplot', {
      transform : function(data){

        var maxy = this.getMaxScale(data.getData(), function(d){return d.y});
        var ordx = this.getOrdinalScale(data.first().data, function(d){return d.x});
        //var maxx = this.getMaxScale(data.getData(), function(d){return d.x});

        var scalex = d3.scale.ordinal().domain(ordx).rangeRoundBands([0, this.w],.1);
        //var scalex = d3.scale.linear().domain([0,maxx]).range([0,this.w]);
        var scaley = d3.scale.linear().domain([0,maxy]).range([this.h,0]);

        data.scalex = scalex;
        data.scaley = scaley;

        return data;
      },
      height : function(height){
        this.h = height;
        this.xyaxis.height(height);
        this.circles.forEach(function(element){
          element.height(height);
        });
        return this;
      },
      width : function(width){
        this.w = width;
        this.xyaxis.width(width);
        this.circles.forEach(function(element){
          element.width(width);
        });
        return this;
      },
      instances : function(size){
        for(var i = 0; i < size ; i++){
          var circles = this.mixin('CirclesChart',this.base.append('g'));
          this.circles.push(circles);
        }
        return this;
      },
      initialize : function(){

        this.xyaxis = this.mixin('XYAxis', this.base.append('g')).showAsGrid();

        this.circles = [];

      }
    });