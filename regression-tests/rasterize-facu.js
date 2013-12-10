var page   = require('webpage').create(),
    system = require('system'),
    address,
    output,
    size,
    RECT = {
      top: 160,
      left: 120,
      width: 870,
      height: 400
    };

if (system.args.length < 3 || system.args.length > 5) {
  console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
  console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
  phantom.exit(1);
} else {
  address = system.args[1];
  output  = system.args[2];

  page.viewportSize = { width: 1024, height: 768 };

  if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
    size = system.args[3].split('*');
    page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                       : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
  }

  if (system.args.length > 4) {
    page.zoomFactor = system.args[4];
  }

  page.open(address, function (status) {
    if (status !== 'success') {
      console.log('Unable to load the address!');
      phantom.exit();
    } else {
      window.setTimeout(function () {
        // move this configuration to a json file
        page.clipRect = RECT;
        // this call creates the file with the captured area
        page.render(output);
        // kill phantom
        phantom.exit();
      }, 3000); // wait 1.5s for animation's complete before call the render method
    }
  });
}
