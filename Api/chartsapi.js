/**
Api for chart creation management

@class ChartsApi
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

var ChartsApi = function(){
	this.scaleFactory = new ScaleFactory();
};

/**
	Appends a chart to a root d3.selection element. Chart is determined
	by a defined chart name.
	Margin is used to translate the chart a small distance. A chart can have many
	instances.

	@method
	@param {Object} options options = {
										chartName : 'BarChart',
										instances : 2,
										root : 'body',
										xAxis : 'ordinal',
										yAxis : 'linear',
										margin : {
											left : 20,
											top : 20,
											lfactor : 4.2,
											tfactor : 4.2										}
									  }
	@return {Object} d3.chart for data drawing
*/
ChartsApi.prototype.chart = function(options){

	var selection = d3.select(options.root);

	var height = parseInt(selection.style('height')),
		  width  = parseInt(selection.style('width'));

	var svg = selection.append("svg")
                 	   .attr("width", width)
                 	   .attr("height", height)
                 	   .append('g')
                 	   .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

    var chart = svg.chart(options.chartName, { instances : options.instances })
    			   .setXScale(this.scaleFactory.scale(options.xAxis,'x'))
    			   .setYScale(this.scaleFactory.scale(options.yAxis,'y'))
    			   .height(height-options.margin.left*options.margin.lfactor)
    			   .width(width-options.margin.top*options.margin.tfactor);
    return chart;
}

/**
Chart names are defined as constants
*/
ChartsApi.prototype.CHART_NAMES = {
	AXIS : 'Axis',
	BAR : 'Bar', 
	BASE_CHART : 'BaseChart',
	CIRCLE : 'Circle',
	DONUT : 'Donut',
	LINE : 'Line',
	ROUNDED_RECTANGLES : 'RoundedRectangle',
	TEXT_LABEL : 'TextLabel',
	TRIANGLE : 'Triangle',
	XY_AXIS : 'XYAxis',
	YXY_AXIS : 'YXYAxis', 
	BAR_CHART : 'BarChart', 
	LABELED_TRIANGLE_CHART : 'LabeledTriangleChart',
	SCATTERPLOT : 'Scatterplot', 
	MULTIPLE_DATA_GROUP : 'MultipleDataGroup', 
	MULTIPLE_INSTANCES_MIXIN : 'MultipleInstancesMixin', 
	SIMPLE_DATA_GROUP : 'SimpleDataGroup' 
}

/**
Axis types are defined as constants
*/
ChartsApi.prototype.AXIS_TYPES = {
	ORDINAL : 'ordinal',
	LINEAR : 'linear'
}