//Iterator
var Iterator = (function(){

  var index = -1;
  var data = null;

  //constructor
  var Iterator = function(d){
     data = d;
  };

  Iterator.prototype.first = function(){
    return data[0];
  };

  Iterator.prototype.next = function(){
    if(!this.hasNext()){
      this.restart();
    }
    return data[++index];
  };

  Iterator.prototype.hasNext = function(){
    if( ( index + 1 ) < data.length){
      return true;
    }
    return false;
  };

  Iterator.prototype.addData = function(d){
    data.push(d);
  };

  Iterator.prototype.restart = function(){
    index = -1;
  };

  Iterator.prototype.getData = function(){
    return data;
  };

  return Iterator;

})();