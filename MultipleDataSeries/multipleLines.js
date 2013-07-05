  //Multiple line chart
  //For multiple and different data input
  //Will containt three linear axis, two y axis and one x axis
  d3.chart('MultipleDataInput').extend('MultipleLines',{
    width : function(width){
      this.w = width;
      this.yxyaxis.width(width);
      this.lines.forEach(function(element){
        element.width(width);
      });
      return this;
    },
    height : function(height){
      this.h = height;
      this.yxyaxis.height(height);
      this.lines.forEach(function(element){
        element.height(height);
      });
      return this;
    },
    instances : function(size){
      for(var i = 0 ; i < size ; i++){
        var line = this.mixin('Lines', this.base.append('g'));
        this.lines.push(line);
      }
      return this;
    },
    initialize : function(){
      this.yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();
      this.lines = [];
    }
  });