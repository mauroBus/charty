/**
* Peak Valley scale for linear axis
*
* @class PeakValleyLinearScale
* @extends BaseScale
* @requires d3.chart,
*           linearscale,
*           charty,
*           uderscore
*
* @author "Cesar Del Soldato <cesards@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/peakvalleylinearscale', [
        'd3.chart',
        'charty/linearscale',
        'charty/chartynames',
        'underscore'
      ],
      function(d3, LinearScale, Charty, _) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(d3, LinearScale, Charty, _);
      });
  } else {
    /** Browser globals */
    root.PeakValleyLinearScale = factory(d3, LinearScale, Charty, _);
  }
}(this, function(d3, LinearScale, Charty, _) {

  /**
  * Class constructor
  *
  * @constructor
  * @param {String} axisType Axis type, defined in Charty names
  */
  var PeakValleyLinearScale = function(axisType) {
    this.scale = d3.scale.linear();
    this.axisType = axisType;
  };

  /**
  * Inheritance from LinearScale
  */
  PeakValleyLinearScale.prototype = new LinearScale();

  /**
  * Calculates the domain for the peak valley linear scale
  *
  * The domain is calculated by adding all the data points one by one
  * and keeping the highest and lowest value it reaches.
  * It sets the domain and the maximum value.
  *
  * @method calculateDomain
  * @param {Object} data Accessor for the data collection
  * @param {Object} f callback function
  * @chainable
  */
  PeakValleyLinearScale.prototype.calculateDomain = function(data, f) {
    var max = 0,
      valley = 0,
      peak = 0,
      sum = 0,
      d = data.getData(),
      self = this;

    if (d && !_.isEmpty(d)) {

      _.each(d, function(element) {
        var chartData = element.data;

        /** Chart can receive no data, should draw nothing or remove already drawn elements */
        if (chartData && !_.isEmpty(chartData)) {
          var maxg = d3.max(chartData, f);
          max = Math.max(maxg, max);

          _.each(chartData, function(dataPoint) {

            if (dataPoint.reset) {
              sum = 0;
            }

            sum = f ? sum + f(dataPoint) : sum + dataPoint;

            if (sum > peak) {
              peak = sum;
            } else if (sum < valley) {
              valley = sum;
            }
          });
        }

        /** Case when there is no data, sometimes can receive a NaN */
        if (!_.isNaN(peak) && !_.isNaN(valley) && !_.isNaN(max)) {
          return self.setMaxValue(max).setDomain([valley, peak]);
        }
      });
    }
  };

  return PeakValleyLinearScale;
}));
