/**
 * Define constants that will be used as names for different parts
 *
 * @class ChartNames
 * @requires chartyinit
 *
 * @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
 */

(function(root, factory) {
    /** Setting up AMD support*/
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define('charty/chartynames', [
                'charty/chartyinit'
            ],
            function(Charty) {
                /** Export global even in AMD case in case this script
                 * is loaded with others */
                return factory(Charty);
            });
    } else {
        /** Browser globals */
        root.Charty = factory(Charty);
    }
}(this, function(Charty) {

    /** Chart / Components / Compositions names */
    Charty.CHART_NAMES = {
        AXIS: 'Axis',
        BAR: 'Bar',
        HORIZONTAL_BAR: 'HorizontalBar',
        WIN_LOSS_BAR: 'WinLossBar',
        BASE_CHART: 'BaseChart',
        CIRCLE: 'Circle',
        DONUT: 'Donut',
        LINE: 'Line',
        ROUNDED_RECTANGLE: 'RoundedRectangle',
        TEXT: 'Text',
        ABOVE_TEXT: 'AboveText',
        RIGHT_TEXT: 'RightText',
        WIN_LOSS_TEXT: 'WinLossText',
        WIN_LOSS_CUSTOM_TEXT: 'WinLossCustomText',
        TRIANGLE: 'Triangle',
        XY_AXIS: 'XYAxis',
        YXY_AXIS: 'YXYAxis',
        BAR_CHART: 'BarChart',
        LABELED_TRIANGLE_CHART: 'LabeledTriangleChart',
        SCATTERPLOT: 'Scatterplot',
        MULTIPLE_DATA_GROUP: 'MultipleDataGroup',
        MULTIPLE_INSTANCES_MIXIN: 'MultipleInstancesMixin',
        SIMPLE_DATA_GROUP: 'SimpleDataGroup',
        DONUT_INNER_TEXT: 'DonutWithInnerText',
        GROUPED_BAR_CHART: 'GroupedBarChart',
        LINE_CHART: 'LineChart',
        LINE_CHART_CIRCLES: 'LineChartCircles'
    };

    /**
     * Axis types are defined as constants
     *
     * Related to scaling.
     */
    Charty.AXIS_TYPE = {
        ORDINAL: 'ordinal',
        LINEAR: 'linear',
        PEAK_VALLEY_LINEAR: 'peakValleyLinear'
    };

    /**
     * Axis defined as constants
     */
    Charty.AXIS = {
        X: 'x',
        Y: 'y'
    };

    return Charty;
}));
