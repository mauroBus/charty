
# TOC

## Chart library

[Demo](index.html)

- [D3](http://d3js.org/)
- [D3.Chart](https://github.com/misoproject/d3.chart/)
- [YUI Coding standard] (http://yui.github.io/yuidoc/syntax/index.html)

## What's new

- Charts Api defined : a chart can be append to a html root element
- Support for negative values
- Redefinition of scatterplot chart
- Donut added, with no labels
- LinearScale, OrdinalScale : separate objects for data mapping
- Directory relocation 
  + Components : each individual component goes here
  + Composition : each composed chart is defined here
  + Utils : utilities for data managing
- Chart instantiation using different preset options
- Simple way for chart creation and instantiaton
- Most charts were renamed
  + SimpleDataInput : takes only one data series to process
  + MultipleDataInput : takes N series to draw. 
- Documentation was added to the code, following the YUI standard


## Coming soon

 - Support for switching linear / ordinal scales
 - Completion of donut chart 
 - Define chart names as constants
 - Relocate labels with text and rounded rectangles
 - Slides to explain composition

## WTF

The main idea in this approach is to separate a chart in its constituting parts. So, a x-y axis system can be seen as a linear scale for x, and another linear scale for y, wich are conceived as two separated objects. Having that, it will be possible to use a custom xy axis system, to build more charts, like for example, a bar chart.

d3.chart will provide a way of defining reusable charts : it's only necessary to call the draw method with the necessary data, and the chart will handle the states of the data.

For that purpose , each drawable chart will have events that represent data's lifecycle : 'enter' for the new data, 'update' for existing data that changes, 'merge' for managing enter and update together, and 'exit', for elemens that no longer exist. For example, if I need to draw 4 circles, when the draw method is called, 4 'circles' svg elements will be added to the root element defined. Merge will handle this situation too.

If I use the same chart with 6 elements, the 'enter' event will handle the two new events, since no svg elements belong to them yet. Update will handle the already defined 4 elements. If the next time I get 3 elements, 'exit' will handle the missing 3 elements.

## Slides

At this point, there are some parts defined that can be used to create a custom and reusable chart.

As a basic chart, a generic chart, with no draw options is defined. It will only contain some functions that all charts can use. Basically, it's an empty chart, and an example of the use of the 'extend' property. Not all functions have to be used, however, its a close way of having standar propierties for all charts.

We have linear axis that can serve as x,y axis (also, the xyaxis chart contains a composite of both axis together), an ordinal chart (to compute discrete values), the rounded rectangles for the text in the bar chart.

As composed charts, a scatterplot was defined. It uses two linear scales as axis, wich are already defined as only ONE chart (it's a composition of the linear scales). The bar chart is a composition of 4 charts.

A donut chart is also defined, without labels.

### CONSIDERATIONS DEFINING A CHART

- **transform** : used to process data before reaching the dataBind propierty.
- **dataBind** : the link between the data itself and the selection of svg elements.
- **insert** : based on the early selection, for every new data element, something will be 
  done, for instance, appending the svg element.
- **events** : we define here every state of data handling
    + 'enter'
    + 'merge'
    + 'update'
    + 'exit'

### HOW TO COMPOSE

Based on the parts defined, a mixin must be defined when the composed chart is initialized. The parent chart will not contain the events, since each part will handle that itself.

For example, the bar chart is a mix of 4 other charts : the ordinal, linear scale, the bars and the rounded rectangles. Having the data processed, its only necessary to define scales for element location.

### ADVANTAGES

- Having understood the d3.chart flow, a chart is not difficult to draw. However, knowledge on d3 is necessary, since d3.chart doesn't provide charts itself. Just a way to order the handling of data states.

- Possibility of reusing charts, just by drawing the new data.

- Composing new charts based on already defined ones.

### PROBLEMS FOUND

- Since d3 already provides a native way to draw linear and ordinal scales, and handles the data 
  update states, its not quite easy to map to the lifecycle that d3.chart proposes. Also, there is 
  not direct correspondence between each data point and the linear scale : usind d3, it is easy to 
  draw the scale getting the minimun and maximun values, and defining the domain.
  For example, examining the d3.chart flow, if I want to draw an ordinal scale of 5  values, I would
  have to define an 'insert' for each element to add. However, this is not necessary, since we can 
  define a d3.scale.ordinal() and set the domain.
  This doesn't work, since we only need one svg:g element that will contain the whole scale. The idea
  to solve this situation is to force the data 'enter' (or merge) state to contain only one element. 
  This way, an svg:g will be added to contain the scale. Same idea was addressed for the linear scales.

- A similar problem is found when trying to draw a line chart, since d3 provides a line primitive. Also,
  it's computed using the 'datum' instead of 'data' : this way, we don't compute enter / exit states, it 
  doesn't compute data join.
  
  