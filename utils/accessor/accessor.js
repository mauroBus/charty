/**
Accessor for data collection

Accessor will iterate over the data collection.

@class Accessor
@constructor

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define(function () {
      /** Export global even in AMD case in case this script
      is loaded with others */
      return factory();
    });
  }
  else {
    /** Browser globals */
    return factory();
  }
}(this, function() {
  function Accessor(d) {
    this.index = -1;
    this.data = d;
  }

  /**
  Returns first element of the collection

  @method
  @return {Object} data element from the collection
  */
  Accessor.prototype.first = function() {
    return this.data[0];
  };

  /**
  Returns the next element of the collection
  If no more elements are available,
  collection index will reset itself

  @method
  @return {Object} next element in the collection,
  first element in case of reset
  */
  Accessor.prototype.next = function() {
    if(!this.hasNext()){
      this.restart();
    }
    return this.data[++this.index];
  };

  /**
  Determines if the collection has more elements

  @method
  @return {Boolean} true if collection has more elements,
  false if not
  */
  Accessor.prototype.hasNext = function() {
    return this.index + 1 < this.data.length;
  };

  /**
  Resets the colletion to restart iteration automatically

  @method
  */
  Accessor.prototype.restart = function() {
    this.index = -1;
  };

  /**
  Returns the data contained in the accessor

  @method
  @return {Object} data collection
  */
  Accessor.prototype.getData = function() {
    return this.data;
  };

  /**
  Sets a specific data set to this accessor

  @method
  @param {Object} data Data series
  */
  Accessor.prototype.setData = function(data){
    this.data = data;
  };

  return Accessor;
}));