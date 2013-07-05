  //Y-X-Y axis system
  d3.chart('GenericChart').extend('YXYAxis',{
    showAsGrid : function(){
      this.xaxis.showAsGrid(true);
      this.yaxisleft.showAsGrid(true);
      return this;
    },
    height : function(height){
      this.xaxis.height(height).ytranslate(height);
      this.yaxisright.height(height);
      this.yaxisleft.height(height);
      return this;
    },
    width : function(width){
      this.xaxis.width(width);
      this.yaxisright.width(width).xtranslate(width);
      this.yaxisleft.width(width);
      return this;
    },
    initialize : function(){
      this.xaxis = this.mixin('Axis', this.base.append('g')).orient('bottom').axistype('x');
      this.yaxisleft = this.mixin('Axis',this.base.append('g')).orient('left').axistype('y');
      this.yaxisright = this.mixin('Axis', this.base.append('g')).axistype('y').orient('right');
    }
  });