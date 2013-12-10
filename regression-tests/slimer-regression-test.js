// Testing with Slimer
//  - Taking screenshots
//
// To Execute it: ">.\slimerjs-0.8.5\slimerjs.bat .\slimer-regression-test.js"

var screenshotFile1 = 'slimerResults/screenshots/screenshot.png';
var screenshotFile2 = 'slimerResults/screenshots/screenshot2.png';

var page = require('webpage').create();

page.open('http://localhost:81/charty/Examples/NonAMD/index.htm')
  .then(function() { // executed after loading

    // setting viewport size
    page.viewportSize = {
      width: 1024,
      height: 768
    };

    // taking a screenshot
    page.render(screenshotFile1);
  });



// IMAGE COMPARISION (Using Resemble)

// var resembleFile = require('./resemble/resemble.js');
// page.injectJs('./Resemble.js-master/resemble.js');

// var diff = resembleFile.resemble(screenshotFile1).compareTo(screenshotFile2).onComplete(function(data) {
//   console.log(data);
  /*
  {
    misMatchPercentage : 100, // %
    isSameDimensions: true, // or false
    dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
    getImageDataUrl: function(){}
  }
  */
// });
