  //Receives different input data, with different
  //scaling
  d3.chart('GenericChart').extend('MultipleDataInput', {
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
    }
  });