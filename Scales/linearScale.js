/**
 * Linear
 */
var LinearScale = (function(){

  var scale = null;
  var type = null;

  var LinearScale = function(){
    scale = d3.scale.linear();
  };

  LinearScale.prototype.type = function(t){
    type = t;
  };

  LinearScale.prototype.range = function(ran){
    if(type === 'x'){
      scale.range([0,ran]);
    }
    else{
      if(type === 'y'){
        scale.range([ran,0]);
      }
    }
  };

  LinearScale.prototype.domain = function(dom){
    scale.domain([0,dom]);
  };

  LinearScale.prototype.scale = function(p){
    return scale(p);
  };

  return LinearScale;

})();