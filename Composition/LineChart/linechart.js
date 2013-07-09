/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends BaseChart
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('BaseChart').extend('LineChart',{
	initialize : function(args){
		var options = {
			chartName : 'Line',
			instances : args.instances
		}

		var lineChart = this.mixin('MultipleDataInput', this.base.append('g'), options);
		var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();

		this.componentsMixins = [];
		this.componentsMixins.push(lineChart);
		this.componentsMixins.push(yxyaxis);
	}
});