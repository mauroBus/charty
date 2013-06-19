    //GENERIC FUNCTIONS CHART
    //Functions that can be used by all charts are defined here
    d3.chart('GenericChart',{
      width : function(newMargin){
        if(arguments.length === 0){
          return this.w;
        }
        this.w = newMargin;
        this.base.attr("width", this.w);
        return this;
      },
      height : function(newHeigth){
        if(arguments.length === 0){
          return this.h;
        }
        this.h = newHeigth;
        this.base.attr("height", this.h);
        return this;
      },
      maxCoords : function(data){
        //Returns only max coordinates for scaling
        var maxX = d3.max(data, function(d){return d.x});
        var maxY = d3.max(data,function(d){return d.y});

        var maxCoords = [];
        maxCoords.push(maxX);
        maxCoords.push(maxY);

        return maxCoords;
      },
      dataMaxCoords : function(data){
        //Returns both original data and max coordinates for scaling
        var newdata = {};
        newdata.data = data;
        newdata.maxcoords = this.maxCoords(data);

        return newdata;
      },
      maxFromFunction : function(data,f){
        var result = [];
        var max = d3.max(data,f);
        result.push(d3.max(data, f));
        return result;
      },
      setXScale : function(xScale){
        this.xscale = xScale;
        return this;
      },
      setYScale : function(yScale){
        this.yscale = yScale;
        return this;
      }
    });