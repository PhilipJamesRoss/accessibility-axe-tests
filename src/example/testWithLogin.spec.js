var selenium = require('selenium-webdriver'),
    until = selenium.until;
var browser;
const constants = require('./../constants');
const axeHelper = require('../helpers/axe');
const loginHelper = require('../helpers/login');
const browserUtil = require('../utils/browser');

jasmine.DEFAULT_TIMEOUT_INTERVAL = constants.SCRIPT_TIMEOUT;

describe('Accessibility tests with axe', () => {

    beforeEach(function(done) {

        browser = browserUtil.getBrowser();

        console.info('The page');
        //in this example you could use a login function and pass in parameters
        //use this in the before each so before every it you are logging in
        loginHelper.loginAsUser(browser, constants.PERSON_EMAIL, constants.PERSON_PASSWORD);
        done();
    });

    it('should analyze the *** page *** for accessibility violations', function (done) {
        browser.wait(until.elementLocated(selenium.By.css('some element')))
            .then(function () {
                axeHelper.runAxe(browser);
                done();
            })
            .catch(function(err) {
                done.fail(err);
            });
    });

    afterEach(function(done) {
        //quit the browser after each test
        browser.quit().then(function () {
            done();
        })
            .catch(function(err){
                console.info(err.message);
                done();
            });
    });
});
