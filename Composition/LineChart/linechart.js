/**
Line chart drawers.
Takes N input data series

@class LineChart
@extends MultipleDataGroup
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

d3.chart('MultipleDataGroup').extend('LineChart',{
	initialize : function(args){
		var options = {
			chartName : 'Line',
			instances : args.instances
		}

		var yxyaxis = this.mixin('YXYAxis', this.base.append('g')).showAsGrid();
		var lineChart = this.mixin('MultipleInstancesMixin', this.base.append('g'), options);

		this.componentsMixins = [];
		this.componentsMixins.push(lineChart);
		this.componentsMixins.push(yxyaxis);
	}
});