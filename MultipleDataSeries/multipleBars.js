  //Double bar chart
  d3.chart('MultipleDataInput').extend('MultipleBars', {
    width : function(newwidth){
      this.w = newwidth;
      this.yxyaxis.width(newwidth);
      this.barsarray.forEach(function(element){
        element.width(newwidth);
      });
      return this;
    },
    height : function(newheight){
      this.h = newheight;
      this.yxyaxis.height(newheight);
      this.barsarray.forEach(function(element){
        element.height(newheight);
      });
      return this;
    },
    instances : function(size){
      for(var i = size-1; i >= 0 ; i--){
        var barmixin = this.mixin('Bars', this.base.append('g'));
        barmixin.l = ((i+1)/size);
        this.barsarray.push(barmixin);
      }
      return this;
    },
    initialize : function(){

      this.yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();

      this.barsarray = [];  //Can draw many bars with different data input

    }
  });