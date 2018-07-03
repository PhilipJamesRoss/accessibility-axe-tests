var selenium = require('selenium-webdriver'),
    until = selenium.until;
var browser;
const constants = require('./../constants');
const axeHelper = require('../helpers/axe');
const config = require('../config');
const browserUtil = require('../utils/browser');

jasmine.DEFAULT_TIMEOUT_INTERVAL = constants.SCRIPT_TIMEOUT;

describe('Accessibility tests with axe', () => {

    beforeAll(function(done) {

        browser = browserUtil.getBrowser();
        console.info('GOV.UK for demo');
        browser.get(`${config.BASE_URL}/`)
            .then(function () {
                done();
            })
            .catch(function(err){
                console.info(err.message);
                done();
            });
    });

    it('should analyze the *** gov.uk *** page for accessibility violations', function (done) {
        //wait for some element to be present on the page
        browser.wait(until.elementLocated(selenium.By.css(constants.GOV_SEARCH)));
        //wait for some other element to be present on the page
        browser.wait(until.elementLocated(selenium.By.css(constants.BENEFITS_LINK)))
            .then(function () {
            //run the axe function passing in the browser as a parameter
            //see the axeHelper for details of function
                axeHelper.runAxe(browser);
                done();
            })
            .catch(function(err) {
                done.fail(err);
            });
    });

    it('should analyze the *** gov.uk with the feedback accordian expanded *** for accessibility violations', function (done) {
        //example of test where you interact with the page before analyzing
        browser.wait(until.elementLocated(selenium.By.css(constants.GOV_SEARCH)))
            .then(function() {
                return browser.findElement((selenium.By.css(constants.LEAVE_FEEDBACK_LINK)));
            })
            .then(function(clickFeedbackLink) {
                clickFeedbackLink.click();
            })
            .then(function() {
                return browser.wait(until.elementLocated(selenium.By.css(constants.WHAT_WERE_YOU_DOING_FIELD)));
            })
            .then(function() {
                axeHelper.runAxe(browser);
                done();
            })
            .catch(function(err) {
                done.fail(err);
            });
    });

    afterAll(function(done) {
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
