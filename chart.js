    //XY Axis
    //Uses two linear scales
    d3.chart('GenericChart').extend('XYAxis',{
      height : function(height){
        //Sets own values and to composite elements
        this.h = height;
        this.xAxis.height(height).translate(height);
        this.yAxis.height(height);
        return this;
      },
      width : function(width){
        this.w = width;
        this.xAxis.width(width);
        this.yAxis.width(width);
        return this;
      },
      initialize : function(){
        //Mixins are used to compose charts
        //Each chart will be called on a separated basis
        var xdata = function(d){return d.x};
        this.xAxis = this.mixin('NumericalAxis',this.base.append('g')).dataFunc(xdata).orient('bottom');
        var ydata = function(d){return d.y};
        this.yAxis = this.mixin('NumericalAxis',this.base.append('g')).dataFunc(ydata).orient('left');
      }
    });

    //Bar chart with labels
    d3.chart('GenericChart').extend('BarChart',{
      height : function(height){
        this.h = height;
        this.ordinal.height(height);
        this.yAxis.height(height);
        this.bars.height(height);
        this.labels.height(height);
        return this;
      },
      width : function(width){
        this.h = width;
        this.ordinal.width(width);
        this.yAxis.width(width);
        this.bars.width(width);
        this.labels.width(width);
        return this;
      },
      initialize : function(){
        //Bar chart is a composition of 4 previously defined charts
        this.ordinal = this.mixin('OrdinalAxis',this.base.append('g'));
        var ydata = function(d){return d.y};
        this.yAxis = this.mixin('NumericalAxis',this.base.append('g')).dataFunc(ydata).orient('left');
        this.bars = this.mixin('Bars', this.base.append('g'));
        this.labels = this.mixin('RoundedRectangles',this.base.append('g'));
      }
    });

  //Scatterplot chart
  d3.chart('GenericChart').extend('Scatterplot', {
      height : function(height){
        this.h = height;
        this.xyaxis.height(height);
        this.circlechart.height(height);
        return this;
      },
      width : function(width){
        this.w = width;
        this.xyaxis.width(width);
        this.circlechart.width(width);
        return this;
      },
      initialize : function(){
        this.xyaxis = this.mixin('XYAxis',this.base.append('g'));
        this.circlechart = this.mixin('CirclesChart',this.base.append('g'));
      }
    });



