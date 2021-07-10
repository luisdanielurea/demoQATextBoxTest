import {browser, Config} from 'protractor';
import {Reporter} from '../../presentation-test-core/support/reporter';
import {Helpers} from '../../presentation-test-core/helpers';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

const fs = require('fs');

const jsonReportLocation = '/test/reports/json/';
const jsonReports = path.join(process.cwd(), jsonReportLocation);

const action = new Helpers();
const dateTime = action.getCurrentDateTime('dd_mm_yyyy-HH_MM') + '_00';

const dirRerunTests = 'test/resources/features/failedTests/';

const capabilitiesMap = {
    'chrome': {
        browserName: 'chrome',
        browserVersion: '72.0.3626.121',
        chromeOptions: {
            args: ['--disable-infobars'
            ]
        },
        cucumberOpts: {
            compiler: 'ts:ts-node/register',
            format: ['json:' + jsonReports + '/cucumber_report.json', 'rerun:test/resources/features/failedTests/@rerun.txt'],
            require: ['../stepdefinitions/*.js', '../../presentation-test-core/support/*.js'],
            strict: true,
           // tags: '@e2e',
        },
    },

    'firefox': {
        browserName: 'firefox',
        browserVersion: '65.0.2',
        cucumberOpts: {
            compiler: 'ts:ts-node/register',
            format: 'json:' + jsonReports + '/cucumber_report.json',
            require: ['../stepdefinitions/*.js', '../../presentation-test-core/support/*.js'],
            strict: true,
            // tags: '@OneAppliance',
        },
    }
};

export const config: Config = {

    // seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 15000,
    restartBrowserBetweenTests: false,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../../../../../test/resources/features/*.feature',
    ],

    params: {
        headless: 'false',
        env: '',
        environmentUrl: 'test/resources/data/environmentUrls.json',
        timeoutpage: 8000,
    },

    beforeLaunch: () => {
        // Creating a directory to save the failed tests
        if (!fs.existsSync(dirRerunTests)) {
            mkdirp.sync(dirRerunTests);
        }
    },


    onPrepare: () => {
        if (browser.params.env === 'uat') {
            config.baseUrl = 'https://services.uat.emagin.eu/ws/payment/session/v1.0';
        } else {
            this.baseUrl = 'https://www.google.es';
        }

        browser.ignoreSynchronization = false;
        Reporter.createDirectory(jsonReports + dateTime);
    },

    onComplete: () => {
        Reporter.createHTMLReport(dateTime);
    },
};

let browserToUse = 'chrome'; // set default value
const three = 3;
process.argv.slice(three).forEach(function (arg) {

    if (arg.includes('env')) {
        const value = arg.split('=')[1];
    }

    if (arg.includes('headless')) {
        const headlessOption = arg.split('=')[1];

        if (headlessOption === 'true') {
            if (browserToUse === 'chrome') {
                capabilitiesMap[browserToUse]['chromeOptions']['args'] = ['--headless', '--disable-gpu', '--no-sandbox'];
            }
        }

    }

});
config.capabilities = capabilitiesMap[browserToUse];
