  //Defines a chart that takes different data sets as input
  //Everything will be draw in the same chart

  //Data convention -> data works as a queue
  //First N elements are data series to represent
  //Then, data contains elements for scaling and mapping
  d3.chart('GenericChart').extend('StackedInput', {
    transform : function (data) {
      var top = data.next();
      top.scaley = data.scaley;
      top.scalex = data.scalex;
      return top;
    }
  });
