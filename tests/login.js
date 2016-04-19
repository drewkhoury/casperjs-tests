/**
 * Homepage tests.
 */

casper.test.begin('Tests Bamboo - LoggedIn', 1, function suite(test) {

  casper.start();

  // Open the homepage.
  casper.thenOpenPath('/', function() {
    // Verify that the main menu links are present.
    test.assertTextExists('version 5.7.2 build 5716', 'Text "version 5.7.2 build 5716" found.');
  });

  // print out all the messages in the headless browser context
  casper.on('remote.message', function(msg) {
      //this.echo('remote message caught: ' + msg);
  });

  // print out all the messages in the headless browser context
  casper.on("page.error", function(msg, trace) {
      //this.echo("Page Error: " + msg, "ERROR");
  });

  var url = 'https://my_bamboo_url.com.au/';

  casper.start(url, function() {
     // search for 'casperjs' from google form
     console.log("page loaded");
     this.test.assertExists('form#loginForm', 'form is found');
     this.fill('form#loginForm', { 
          os_username: 'xxx', 
          os_password:  'xxx'
      }, true);
  });
  
  casper.thenOpenPath('/allPlans.action', function() {

    casper.capture('images/logged-in.png');
    test.assertTextExists('Build Dashboard', 'Text "Build Dashboard" found.');

    projects = this.evaluate(function() {
        return __utils__.findAll('table tbody.project').length;
    });

    test.assertEval(function() {
        return __utils__.findAll("table tbody.project").length > 5;
    }, 'More than 5 projects listed, the exact number found was ' + projects );

    // ajax send the data to dashing! 

  });


  casper.thenOpenPath('/telemetry.action', function() {

    builds = this.evaluate(function() {
        return __utils__.findAll('div#wallboard div.build').length;
    });

    test.assertEval(function() {
        return __utils__.findAll("div#wallboard div.build").length > 5;
    }, 'More than 5 builds listed, the exact number found was ' + builds );

    // builds_failed = this.evaluate(function() {
    //     return __utils__.findAll('div#wallboard div.build div.Failed').length;
    // });
    
    //builds_failed_percentage=Math.floor((builds_failed / builds) * 100)

    //builds_failed_threshold= Number(builds * 0.5) 
    // this.echo(builds_failed_threshold)
    //builds_failed_threshold=30

    //test.assertEval(function() {
    //    return Number(__utils__.findAll("div#wallboard div.build div.Failed").length) > Number(builds_failed_threshold);
    //}, 'More than '+Number(builds_failed_threshold)+' builds failed, the exact number found was ' + builds_failed);

  });




  casper.run(function() {
    test.done();
  });

});







