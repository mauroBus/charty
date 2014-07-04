/**
 * Text labeling in the middle the data element with Win Loss offser calculation.
 * Redefindes "merge"
 * Useful for vertical bar chart.
 *
 * @class AboveText
 * @extends Text
 * @requires d3.chart,
 *           charty,
 *           text
 *
 * @author "Mauro Buselli <maurobuselli@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/winlossabstext', [
                'd3.chart',
                'charty/chartynames',
                'charty/text'
            ],
            function(d3, Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(d3, Charty);
            });
    } else {
        /** Browser globals */
        factory(d3, Charty);
    }
}(this, function(d3, Charty) {
    d3.chart(Charty.CHART_NAMES.WIN_LOSS_TEXT)
        .extend(Charty.CHART_NAMES.WIN_LOSS_CUSTOM_TEXT, {

            initialize: function(args) {
                if (args.customLabelText && _.isFunction(args.customLabelText)) {
                    this.text = args.customLabelText;
                }
            }

        });
}));
