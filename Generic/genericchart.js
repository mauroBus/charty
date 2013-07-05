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
      getMaxScale : function(data, f){
        var max = 0;
        data.forEach(function(element){
          var d = element.data;
          var maxg = d3.max(d, f);
          if(maxg > max){
            max = maxg;
          }
        });
        return max;
      },
      getOrdinalScale : function(data, f){
        var ordinal = data.map(f);
        return ordinal;
      },
      getScaledValue : function(scale, value){
        if(!scale.rangeBand){
          return scale(value);
        }
        else{ //For ordinal scales
          return scale(value)+(scale.rangeBand()/2);
        }
      }
    });