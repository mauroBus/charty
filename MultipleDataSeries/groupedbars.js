  //Bars grouped
  d3.chart('GenericChart').extend('GroupedBars', {
    height : function(heigth){
     // this.yxyaxis.height(heigth);
      return this;
    },
    width : function(width){
      //this.yxyaxis.width(width);
      return this;
    },
    transform : function(data){
      //Grouper bars needs another scale
      console.log(data.getData());
    },
    initialize : function(){

      //this.yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();

    }
  });