var selenium = require('selenium-webdriver');
var driver;
const config = require('../config');

function getBrowser() {console.info(config.BROWSER);
    if (config.BROWSER === 'headlessChrome') {
        return headlessChrome();
    }
    else if (config.BROWSER === 'chrome') {
        return chrome();
    }
    throw new Error('Invalid config');
}

function headlessChrome() {
    const chromeCapabilities = selenium.Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', {
        'args': [ '--headless', '--disable-gpu', '--allow-insecure-localhost', '--no-sandbox' ]
    });
    driver = new selenium.Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities);

    return driver.build();
}

function chrome() {
    driver = new selenium.Builder()
        .forBrowser('chrome');

    return driver.build();
}

module.exports = {
    headlessChrome,
    chrome,
    getBrowser
};
