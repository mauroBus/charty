# Chart library

[Demo](index.html)

- [D3](http://d3js.org/)
- [D3.Chart](https://github.com/misoproject/d3.chart/)
- [YUI Comments Standard](http://yui.github.io/yuidoc/syntax/index.html)
- [R2D3](https://github.com/mhemesath/r2d3)
- [Raphäel](https://github.com/DmitryBaranovskiy/raphael)
- [IE8 polyfills](https://github.com/jonathantneal/Polyfills-for-IE8)
- [AMD feature](https://github.com/jensarps/AMD-feature)
- [bower](https://github.com/bower/bower)
- [bind function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Browser_compatibility)
- requirejs, jquery, underscore

## Browser Support

- IE8
  + Via r2d3 : Raphäel for SVG support. Includes polyfills for ECMA5 support. Also, might require "getComputedStyle", wich is also not included. 
	+ d3.chart : requires "bind" function, wich is not added by r2d3.
- Chrome, Firefox, Safari, above IE8
	+ Via d3
- Below IE8
	+ No support added. 

Important : r2d3 is used as a library, not polyfills to add d3 support, so conditional loading was added, via AMD feature. In case of IE8, r2d3 is used (and some polyfills wich r2d3 doesn't provide). Other case, d3 is used. 

## Installing

+ Clone the repository
+ Install bower (via nodejs, if necessary) : npm install bower -g
+ bower install

## What's new

- Charts Api defined : a chart can be append directly to a html root element
- Support for negative values
- LinearScale, OrdinalScale : separate objects for data mapping
- Directory components relocation
  + Components : each individual component goes here
  + Composition : each composed chart is defined here
  + Utils : utilities for data managing
- Chart instantiation using different preset options
- Simple way for chart creation and instantiaton
- Most charts were renamed.
  + SimpleDataGroup : takes only one data series to process
  + MultipleDataGroup : takes N series to draw.
  + MultipleInstancesMixin : creates N instances of a specific mixin.
  Since it is the same mixin, creation is the same.
- Documentation was added to the code, following the YUI standard
- bower added for dependencies install
- IE8 support via r2d3 and some polyfills

## Known issues

+ Updating some charts that have an axis system displayed as a grid, can have unusual drawing behaviour (for example, the LabeledTriangleChart, some grid lines are displayed before the triangles, but some others not)
+ Adding a background image to the chart : can't be done via SVG:image, since it doesn't have full support for IE8 yet. 

## WTF

The main idea in this approach is to separate a chart in its constituting parts. So, a x-y axis system can be seen as a linear scale for x, and another linear scale for y, wich are conceived as two separated objects. Having that, it will be possible to use a custom xy axis system, to build more charts, like for example, a bar chart.

d3.chart will provide a way of defining reusable charts : it's only necessary to call the draw method with the necessary data, and the chart will handle the states of data update.

For that purpose , each drawable chart will have events that represent data's lifecycle : 'enter' for the new data, 'update' for existing data that changes, 'merge' for managing enter and update together, and 'exit', for elemens that no longer exist. For example, if I need to draw 4 circles, when the draw method is called, 4 'circles' svg elements will be added to the root element defined. Merge will handle this situation too.

If I use the same chart with 6 elements, the 'enter' event will handle the two new events, since no svg elements belong to them yet. Update will handle the already defined 4 elements. If the next time I get 3 elements, 'exit' will handle the missing 3 elements.

## D3

d3.chart is a framework designed for chart drawing using d3. d3 also provides a way of working over svg elements, so a bit of knowledge in both concepts are recommended.

## D3 for drawing

d3 works defining selections of svg elements (or classes), and will compute a join between svg elements and data to be rendered. Svg elements work defining attributes , so they must be explicitly set (for example, width must be set using something like this.attr('width', value)).

With the selection, it is possible to define common attributes or styles for every svg:element attached to every data element.

Also, d3 provides some layouts for drawing specific charts. For example, a pie chart needs paths and arcs (an arc has staring / ending angles, etc), so the pie layout processes the data in a way that information necessary for the arcs or paths is automatically calculated. Without using the layout, calculations should be done manually.

## Some main concepts

+ Layer : a chart can contain many layers, each of them will have defined a data binding and specific drawing events / data update. For example, a layer for circles and another layer for axis can be used to draw a scatterplot (axis system + circles for each data point)

+ Chart : can be composed of other layers or charts. Should process the data before each layer is called for drawing. A chart itselft won't draw anything, that situation will be covered by the layer.

+ draw : each chart will have a draw method, that will draw layers and charts defined in it.

+ redraw : when data changes, chart's draw method must be called again, in order to update the data and svg elements rendered.

## Components

At this point, there are some parts defined that can be used to create a custom and reusable chart. Each component is seen as a separate constituting part of the chart that will be created.

### Individual components

+ Axis : will render an axis. Configuration options will determine whether it will render and x or y axis.
+ Bar : will render bars (like in a bar chart) for one data serie.
+ Circles : renders circles for one data serie.
+ Donut : pie chart, renders as a donut
+ Line : draws a line for a data serie.
+ Rounded rectangles : used for labeling. Should be related to a text.
+ TextLabel : defines text for labeling. Can be used combined with rounded rectangles to create a label.
+ Triangle : similar to Bar, but it draws a triangle instead of a bar.

### Composite Charts

+ XYAxis : system with and X and Y axis.
+ YXYAxis : two Y Axis for the same system (one will render on the left and the other on the right of the drawing area).
+ LabeledDonutChart : (still in progress) will draw a donut with labels for each data element.
+ LabeledTriangleChart : defines a chart, similar to a bar chart, but using triangles instead of bars. Also, labels are added where the triangle points, showing the data value.
+ LineChart : lines drawing for many data series.
+ Scatterplot : chart that renders data as circles in an axis system. This chart doesn't use an axis system.

### Basic elements for extending and mixin

+ BaseChart : base for every defined chart. Contains some common functions.
+ SimpleDataGroup : transforms many data series so that the charts that receive the data, get only one data serie (works as a stack, taking the first element)
+ MultipleDataGroup : data manipulation for rendering multiple data series in the same chart. Will process data so that each component chart works as a SimpleDataGroup.
+ MultipleInstancesMixin : easy way to create many components of the same type for a specific chart. So, if a line chart for 5 lines wants to be defined, 5 mixins for 'Bar' will be defined, each of them working as a SimpleDataInput. If we have 5 data series, 5 'Bar' must be defined

### Utilities

+ Accessor : provides a way for data series iteration. This accessor will provide the chance of drawing multiple data series in a same chart.

### Drawing components

+ LinearScale : defines a linear scale, for numeric values (continuos domain).
+ OrdinalScale : defines an ordinal scale, for discrete domain values.
+ ScaleFactory : used for creating available scales.
+ BaseScale : contains some common functionality for scales. 

### API

+ ChartsApi : defines a way to get charts and append them to an html element. Using configuration options, a root must be defined, and a chart will be returned in order to set the data and draw.

### Considerations defining a chart

Each chart can define the following methods. They can be optional, however. For example, a data transform can be defined in a chart with no initialization and no layer for data binding, but other charts will extend from this one.

#### Chart Options

- **initialize** : chart initialization. Layers / Mixins used should be defined here.
- **transform** : used to process data before reaching the dataBind propierty of each layer in the chart.

#### Layer Options

- **dataBind** : the link between the data itself and the selection of svg elements. Using d3, a selection of svg elements is recovered (for example svg:rect) , and using the selection.data method, a data join is computed. This means that each data element will be associated with one element for the selection.
- **insert** : based on the early selection, for every new data element, something will be
  done, for instance, appending the svg element.
- **events** : we define here every state of data handling
    + 'enter' : for every new element
    + 'merge' : for both new and old elements that need update
    + 'update' : old elements will be updated
    + 'exit' : elements that no longer exist should be removed

Here, a the difference between chart and layer can be visualized. A chart will define layers (or use other charts with layers) that will have ways of manipulating data input, update and removal.

### How to compose

Based on the parts defined, a mixin must be defined when the composed chart is initialized. The parent chart will not contain the events, since each part will handle that itself.

For example, the bar chart is a mix of 4 other charts : the ordinal, linear scale, the bars and the rounded rectangles. Having the data processed, its only necessary to define scales for element location.

Once having individual elements defined (like Bar, Circle), it can be easily combined with an axis system to render a scatterplot. So, a new chart is defined (scatterplot) , and the initialization will get many mixins elements as needed : for example, only one mixin for circles, and another one for the whole axis system.

### Data manipulation

Using the transform method, data can be accessed before reaching the drawing instance.

### Advantages

- Having understood the d3.chart flow, a chart is not difficult to draw.

- Possibility of reusing charts, just by drawing the new data.

- Composing new charts based on already defined ones. Having the parts defined, the possibily of building new charts is real.

- Working in separated components gives a better idea of the chart that we want to draw , and wich part must have wich responsibilities.

- Full separation of components, so that each one will have an own draw method, for the composing charts and layers.

- To achieve full separation and independece between components, each one should be in a chart with a unique layer. This way, each unique component can define an own way of transforming data, or use the one defined in the 'parent' chart.

### Problems

- The flow, when drawing a complex chart, can be difficult to follow, since the flow template is already defined. Everything begins at a base chart, and the flow must be followed to the last component parts. The problem arises when each component part is defined in a separated chart.

- Knowledge on d3 and svg is necessary, since d3.chart doesn't provide charts itself. Just a way to manage the handling of data states.

- Some elements have already defined data changes manipulation (like the d3.axis). This means that a draw method for the axis is never called, we just define some configuration parameters that will render the axis and changing those parameters involves the redrawing. So, if the axis will be in a separated component, it must somehow be adapted to the d3.chart flow. This happens with other components too.

- Something similar happens with the d3.svg.line. Each path for the line isn't computed using a data join.
