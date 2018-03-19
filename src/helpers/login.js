var selenium = require('selenium-webdriver'),
    until = selenium.until;
const config = require('../config');
//example of a login helper which assumes that the page under test has a
//username/email and password field with a submit button
function loginAsUser (browser, email, password) {
    browser.get(`some url with a login page`);
    browser.wait(until.elementLocated(selenium.By.css('some emailAddress')))
        .then(function () {
            return browser.findElement((selenium.By.css('some emailAddress')));
        })
        .then(function(enterEmail){
            enterEmail.sendKeys(email);
            return browser.findElement((selenium.By.css('some password')));
        })
        .then(function(enterPassword){
            enterPassword.sendKeys(password);
            return browser.findElement((selenium.By.css('some loginButton')));
        })
        .then(function(enter){
            enter.click();
        })
        .catch(function(err){
            console.info(err.message);
        });
}

module.exports = {
    loginAsUser
};
