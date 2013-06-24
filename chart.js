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
        this.xAxis = this.mixin('NumericalAxis',this.base.append('g')).orient('bottom');
        this.yAxis = this.mixin('NumericalAxis',this.base.append('g')).orient('left');
      }
    });

    //Scatterplot chart
    d3.chart('GenericChart').extend('Scatterplot', {
      transform : function(data){
        var xmax = d3.max(data, function(d){return d.x});
        var ymax = d3.max(data, function(d){return d.y});

        var newdata = {};
        newdata.data = data;
        newdata.linearscalex = xmax;
        newdata.linearscaley = ymax;

        return newdata;

      },
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

    //Bar chart with labels
    d3.chart('GenericChart').extend('BarChart',{
      transform : function(data){
        //Does all data transformation for all charts
        var ordinalscale = data.map(function(d){return d.value});
        var linearscale = this.maxFromFunction(data,function(d){return d.y});

        var newdata = {};
        newdata.ordinalscale = ordinalscale;
        newdata.linearscaley = linearscale;
        newdata.data = data;

        return newdata;
      },
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
        this.yAxis = this.mixin('NumericalAxis',this.base.append('g')).orient('left');
        this.bars = this.mixin('Bars', this.base.append('g'));
        this.labels = this.mixin('RoundedRectangles',this.base.append('g'));
      }
    });

    //Line Chart
    d3.chart('GenericChart').extend('LineChart', {
      transform : function(data){

       //Does all data transformation for all charts
        var ordinalscale = data.map(function(d){return d.value});
        var ymax = d3.max(data, function(d){return d.y});
        var xmax = d3.max(data, function(d){return d.x});


        var newdata = {};

        newdata.linearscaley = ymax;
        newdata.linearscalex = xmax;
        newdata.data = data;

        return newdata;

      },
      height : function(newheigth){
        this.h = newheigth;
        this.xyaxis.height(newheigth);
        this.lines.height(newheigth);
        return this;
      },
      width : function(newwidth){
        this.w = newwidth;
        this.xyaxis.width(newwidth);
        this.lines.width(newwidth);
        return this;
      },
      initialize : function(){
        //Uses x-y axis system + lines
        this.xyaxis = this.mixin('XYAxis', this.base.append('g'));
        this.lines = this.mixin('Lines',this.base.append('g'));
      }

    });




