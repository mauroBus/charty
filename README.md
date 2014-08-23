# Charty

[![Code Climate](https://codeclimate.com/repos/52d7fc9ae30ba059d70177b8/badges/51ccb3e5b026c3f07fd9/gpa.png)](https://codeclimate.com/repos/52d7fc9ae30ba059d70177b8/feed)

This project is a work in progress using d3.chart as base to create a suite of basic components to build
charts. (We are using this suite in production with really good results).

## Browser Supported

- IE9+ (Windows 7 mainly).
  > We are using r2d3 for IE8 support, but it's not perfect.
- Chrome (lastest 2 versions)
- Firefox (lastest 2 versions)
- Safari (lastest 2 versions)
- iOS (lastest 2 versions)
- Android (Not fully tested)

## How to start

+ `git clone git@github.com:chartyjs/charty.git`
+ `npm install bower -g`
+ `npm install && bower install`

## Architecture details

### Reusable components for visualizations using d3.chart

- [d3.chart architure explained](http://bocoup.com/community/presentations/code-architecture-with-d3-js/)

### Things to have in mind

- Always have present the idea of simple composable parts.

- Each chart is composed by one or more layers, where the layer provides events to manage the lifecycle:
  - 'enter' only for the new data.
  - 'update' ony for existing data that has changed.
  - 'merge' both 'enter' and 'update' elements in one place.
  - 'exit' for elemens that no longer exist.

### Components

Dig into the components folder to see some of the basic reusable charts provided.

### Compositions

Dig into the compositions folder to see *composed* components in things more complex as final charts for
example.

### Basic elements for extending and mixin

+ **BaseChart:** base for every defined chart. It contains some common functions
  which are useful at the moment of create common charts.

+ **SimpleDataGroup:** transforms many data series so that the charts that receive
  the data get only one data serie (works as a stack, taking the first element).

+ **MultipleDataGroup:** data manipulation for rendering multiple data series in
  the same chart. It will process data in a way that each chart works as a
  **SimpleDataGroup**.

+ **MultipleInstancesMixin:** easy way to create a many to many relationship between
  several series with several datasets which must to be rendered in the same way. For
  example, imagine a line chart and 3 datasets, and you want to render 1 line chart
  for each dataset, but using the same axis for all the 3 lines.

### Utilities

+ **Accessor:** data series iterator. This accessor will provide the chance of
  drawing multiple data series in a same chart.

+ **DataValidator:** simple underscore wrapper for checking some correct values.

+ **Events:** management of chart's events.

### Scales

+ **BaseScale:** contains some common functionality for scales.

+ **LinearScale:** wraps a linear scale for numeric values (continuos domain).

+ **OrdinalScale:** wraps an ordinal scale for discrete domain values.

+ **PeakValleyLinearScale:** scale with the ability of manage several series to
  determine a unique scale.

### API

The instanciation process and insertion into the DOM is managed by the charty *class*,
which parses a configuration object plus the root element where we should insert the
svg.

```js
// Dataset example
var data1 = {
  c: 'blueline',
  data: [
    { x: 'A', y: 2 },
    { x: 'B', y: 2 },
    { x: 'C', y: 2 }
  ]
};

var data2 = {
  c: 'redline',
  data: [
    { x: 'A', y: -150},
    { x: 'B', y: 50 },
    { x: 'C', y: 30 }
  ]
};

var dataset = [data1, data2];

// Configurations required by the LINE_CHART
var opt = {
  chartName : Charty.CHART_NAMES.LINE_CHART,
  instances : 2,
  root : '#chart3', // CSS selector of the root
  xAxis : Charty.AXIS_TYPE.ORDINAL,
  yAxis : {
    name: Charty.AXIS_TYPE.LINEAR,
    niceDomain: true
  },
  axisSystem : Charty.CHART_NAMES.YXY_AXIS,
  showAsGrid : true,
  yAxisTickFormat: '$d'
};

// Instantiation
var linechart = Charty.chart(opt);

// Main SVG padding to prevent rendering out of the SVG.
var padding = {
  marginleft : 50,
  margintop : 20,
  marginlfactor : 0.80,
  margintfactor : 0.85,
};

// Configure the padding
linechart.setDimensions(padding);

// Render my linechart
linechart.draw(dataset);
```

### Chart

#### Basic chart creation

- **initialize():** chart initialization. Layers / Mixins used should be defined here.
- **transform():** used to process data before reaching the dataBind method of each layer.
  We provide common implementation in the *BaseChart*, *MultipleDataGroup* and *SimpleDataGroup*.

Example:

```js
d3.chart('circle').extend('base', {

  initialize: function() {
    // d3.chart basic layer to manage the lifecycle of your chart
    this.layer('circles', this.base.append('g'), {
      dataBind: function(data) {},
      events: {
        enter: function() {},
        update: function() {},
        merge: function() {},
        exit: function() {}
      }
    });
  },

  transform: function(data) {} // optional
}));
```

#### Layer Options

- **dataBind():** it is the link between the data itself and the selection of svg elements.
  Using d3, a selection of svg elements is recovered (for example svg:rect), and using the
  selection.data method, a data join is computed. This means that each data element will
  be associated with one element for the selection.

- **insert():** based on the early selection, for every new data element, something will be
  done, for instance, appending the svg element (you can provide the implementation you need).

- **events:** we define every state of data handling (lifecycle described before).

Here, a the difference between a *Chart* and a *Layer* can be visualized. Each *Chart* is composed by layers
with specific behavior to visualice your data, and at the same time you could choose compose a *Chart* by
*Chart*s.

#### How to compose

Based on the parts defined, a *mixin* must be defined when the composed chart is initialized. The parent
chart will not contain the events, since each part will handle that itself (the layers basically).

For example, in **Charty** a bar chart is a **mix** of 4 other charts, the ordinal, the linear scale,
the bars and the rounded rectangles (we needed by default some kind of rounded rectangles as labels). Having
the data processed, its only necessary to define scales for element location.

Once having individual elements defined (like Bar or Circle), it can be easily combined with an axis system
to render a scatterplot. So, a new chart is defined (scatterplot), and the initialization will get
many mixins elements as needed, for example, only one mixin for circles, and another one for the whole
axis system.

### Advantages of use d3.chart as baseline

- Having understood the d3.chart flow, a chart is not difficult to draw.

- Possibility of reusing charts, just by drawing the new data.

- Composing new charts based on already defined ones. Having the parts defined, the possibily of building
  new charts is real.

- Working in separated components gives a better idea of the chart that we want to draw , and wich part
  must have wich responsibilities.

- Full separation of components, so that each one will have an own draw method, for the composing charts
  and layers.

- To achieve full separation and independece between components, each one should be in a chart with a
  unique layer. This way, each unique component can define an own way of transforming data, or use the one
  defined in the 'parent' chart.

### Problems we found

- When drawing a complex chart (several composition levels), it can be difficult to follow, since the flow
  template is already defined. Everything begins at a base chart, and the flow must be followed to the last
  component parts. The problem arises when each component part is defined in a separated chart.

  >
  > @dendril
  > The real problem appears when we want redefine a layer completely. If you are in the same
  > situation, please stop and rethink the structure you are creating because you are doing the same
  > mistake as us.
  >
  > **For d3.chart, the extend()** means **augmentation of behavior** and there is NO WAY to override layers
  > present in the *Chart* we are extending. In that case I recommend to just refactor before start doing
  > calls to **off()** as we did.
  >

- Knowledge on d3 and svg is necessary, since d3.chart doesn't provide charts itself.

- Some elements have already defined data changes manipulation (like the d3.axis). This means that a draw
  method for the axis is never called. We just define some configuration parameters that will render the
  axis and changing those parameters involves the redrawing. So, if the axis will be in a separated
  component, it must somehow be adapted to the d3.chart flow. This happens with other components too.

- Something similar happens with the d3.svg.line. Each path for the line isn't computed using a data join,
  and this breaks the basic way of work of *d3.chart*.
