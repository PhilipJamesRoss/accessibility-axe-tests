/* eslint-env node */
'use strict';

const config = {
    //the tests will run by default in headless chrome
    //example config suggests that if you want to run
    //your tests against a different env the URL will
    //vary and the browser will vary
    BASE_URL: process.env.NODE_ENV === 'UAT' ? 'some UAT URL' : 'https://www.gov.uk/',
    BROWSER: process.env.NODE_ENV === 'UAT' ? 'chrome' : 'headlessChrome'
};

module.exports = config;
