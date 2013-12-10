/*
  Require and initialise PhantomCSS module
  Paths are relative to CasperJs directory
*/
//
// To Execute it:
//

var phantomcss = require('./PhantomCSS/phantomcss.js');



var casper = require('./PhantomCSS/CasperJs/modules/casper.js').create({
  clientScripts:  [
    // '../vendor/d3.chart/d3.chart.min.js',
    // '../vendor/underscore/underscore-min.js',
    // '../vendor/jquery/jquery.min.js'
  ],
  pageSettings: {
    localToRemoteUrlAccessEnabled:  true
  },
  verbose: true,                    // log messages will be printed out to the console
  onLoadError: function() {
    console.log('ERROR! y la pta madre...');
  }
  // logLevel: 'debug'
  // setStepTimeout: 5000
});




phantomcss.init({
  screenshotRoot: './phantomResults/phantomScreenshots/',
  failedComparisonsRoot: './phantomResults/phantomFailures',
  casper: casper,
  // libraryRoot: '../Examples/AMD/',
  // fileNameGetter: function overide_file_naming(){},
  // onPass: function passCallback(){},
  // onFail: function failCallback(){},
  // onTimeout: function timeoutCallback(){},
  // onComplete: function completeCallback(){},
  // hideElements: '#thing.selector',
  // addLabelToFailedImage: true
});



/*
  The test scenario
*/
casper.start('http://localhost:81/charty/Examples/NonAMD/index.htm');

casper.viewport(1024, 768);


/*
 * Taking a screenshot at the initialization
 */
casper.then(function() {
  phantomcss.screenshot('body', 'initializing page');
});


/*
 * Chart 1 test.
 */
casper.then(function() {
  var that = this;

  // that.echo(that.getHTML('body'));

  // wait for chart1 generation
  casper.waitForSelector('#chart1 svg',
    function success() {
      // that.echo(this.getGlobal('d3'));
      that.echo(that.getHTML('#chart1'));

      phantomcss.screenshot('#chart1', 'Chart #1');
    },
    function timeout() {
      casper.test.fail('FAIL: Chart #1 has display problems');
    }
  );
});


casper.then( function now_check_the_screenshots() {
  // compare screenshots

  phantomcss.screenshot('body', 'finalizing page');

  phantomcss.compareAll();
});

casper.then( function end_it() {
  casper.test.done();
});


/*
Casper runs tests
*/
casper.run(function() {
  console.log('\nTHE END.');
  phantom.exit(phantomcss.getExitStatus());
});
