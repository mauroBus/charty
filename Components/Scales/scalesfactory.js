/**
	Scale factory

	@class ScaleFactory
	@constructor
	
	@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"  
*/

var ScaleFactory = function(){

};

/**
	Returns a specified scale object, acording to a scale type

	@method
	@param {String} scaleType Available scale type
	@param {String} axisType Related axis type ('x'-'y')
	@return {Object} d3.scale
*/
ScaleFactory.prototype.scale = function(scaleType, axisType){
	var scale; 

	switch(scaleType){
		case 'ordinal' : 
			scale = new OrdinalScale(axisType); 
			break;
		case 'linear' :
			scale = new LinearScale(axisType); 
			break; 
	}
	return scale; 
}