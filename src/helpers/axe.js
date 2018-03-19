const AxeBuilder = require('axe-webdriverjs');
//call this function from your test to analyse a page for accessibility violations
//you need to ensure that you pass in the broswer as a parameter
// uncomment line below for more thorough log
// var util = require('util');
function runAxe (driver) {
    AxeBuilder(driver)
        .analyze(function(results) {
            console.info('Accessibility Violations: ', results.violations.length);
            if (results.violations.length > 0) {
                // uncomment line below for more thorough log
                // console.log(util.inspect(results.violations, true, null));
                console.info(results.violations);
            }
            expect(results.violations.length).toBe(0);
        });
}

module.exports = {
    runAxe
};
