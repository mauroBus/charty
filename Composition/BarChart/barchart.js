/**
Create a bar chart that will render
N data series

@class BarChart
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('BaseChart').extend('BarChart',{
	/**
	BarChart initialization.

	@method
	@param {Object} args example = {
									   instances : 2,
								   }		
	*/
	initialize : function(args){

		var options = {
			chartName : 'Bar',
			instances : args.instances, 
		};

		var barChart = this.mixin('MultipleDataInput', this.base.append('g'),options);
		var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();

		this.componentsMixins = [];
		this.componentsMixins.push(barChart);
		this.componentsMixins.push(yxyaxis);
	}
});