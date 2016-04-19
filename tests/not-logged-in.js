/**
 * Not logged-in
 */

casper.test.begin('Tests Bamboo - Not Logged-in', 1, function suite(test) {
  casper.start();

  // Open the homepage.
  casper.thenOpenPath('/', function() {
    casper.capture('images/not-logged-in.png');
    test.assertTextExists('version 5.7.2 build 5716', 'Text "version 5.7.2 build 5716" found.');
  });

  casper.run(function() {
    test.done();
  });
});