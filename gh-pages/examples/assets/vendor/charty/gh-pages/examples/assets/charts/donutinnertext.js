/** 
* Donut chart with inner text.
*
* Takes a random background image.
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define([
      'charty/charty'
      ],
      function (Charty) {
      /** Export global even in AMD case in case this script
      * is loaded with others */
      return factory(Charty);
    });
  }
  else {
    /** Browser globals */
    factory(Charty);
  }
}(this, function (Charty) {
  
  "use strict";

  /** 
  * ir : inner radius
  * or : outter radius. Both set the width of the element.
  * xPosition : translate along x axis
  * yPosition : translate along y axis
  * c : element color
  */
  var data4 = {
    ir :  110,
    or :  70,
    /*xPosition : 200,
    yPosition : 200,*/
    data : [
      {y : 25 , c: 'red'},
      {y : 175, c: 'gray'}
    ]
  };

  var datagroup4 = [];

  datagroup4.push(data4);

  /** 
  * instances : data groups to draw
  * root : div container
  */
  var options6 = {
    chartName : Charty.CHART_NAMES.DONUT_INNER_TEXT,
    instances : 1,
    root : '#chart6'
  };

  /** Donut chart with inner text and background image*/
  var chart6 = Charty.chart(options6);

  /** Needs no parameters, it will be displayed in the middle of the SVG canvas */
  chart6.setDimensions();

  /** Background image setting via CSS*/
  chart6.setBackgroundImage('imgCenter');

  /** 
  * Needs x and y position
  */
  chart6.setTitle('Hi ! My name is Donut Chart! ', 200, 0);
  chart6.draw(datagroup4);
}));