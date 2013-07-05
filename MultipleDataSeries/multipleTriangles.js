  //Triangles chart
  //Similar to bar chart, but draws triangles instead of bars
  d3.chart('MultipleDataInput').extend('MultipleTriangles', {
    height : function(height){
      this.h = height;
      this.triangles.height(height);
      this.xyaxis.height(height);
      this.recs.height(height);
      this.labels.height(height);
      return this;
    },
    width : function(width){
      this.w = width;
      this.triangles.width(width);
      this.xyaxis.width(width);
      this.recs.width(width);
      this.labels.width(width);
      return this;
    },
    initialize : function(){
      this.xyaxis = this.mixin('XYAxis', this.base.append('g')).showAsGrid();
      this.triangles = this.mixin('Triangles', this.base.append('g'));
      this.recs = this.mixin('RoundedRectangles', this.base.append('g'));
      this.labels = this.mixin('TextLabels', this.base.append('g'));
    }
  });