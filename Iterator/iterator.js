/**
Array Iterator Abstraction.

@class Iterator
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/
function Iterator(d) {
  this.index = -1;
  this.data = d;
}

Iterator.prototype.first = function() {
  return this.data[0];
};

Iterator.prototype.next = function() {
  if(!this.hasNext()){
    this.restart();
  }
  return this.data[++this.index];
};

Iterator.prototype.hasNext = function() {
  return this.index + 1 < this.data.length;
};

Iterator.prototype.restart = function() {
  this.index = -1;
};

Iterator.prototype.getData = function() {
  return this.data;
};