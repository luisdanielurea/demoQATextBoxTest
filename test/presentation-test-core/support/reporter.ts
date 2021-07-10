import * as reporter from 'multiple-cucumber-html-reporter';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import {config} from '../../resources/config/config';

const jsonReportLocation = '/test/reports/json/';
const htmlReportLocation = '/test/reports/html/';
const jsonReports = path.join(process.cwd(), jsonReportLocation);
const htmlReports = path.join(process.cwd(), htmlReportLocation);

export class Reporter {

  public static createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  }

  public static createHTMLReport(dateTime) {

    const cucumberReporterOptions = {
      automaticallyGenerateReport: true,
      openReportInBrowser: true,
      jsonDir: jsonReports,
      reportPath: htmlReports + dateTime,
      reportSuiteAsScenarios: true,
      metadata: {
        browser: {
          name: config.capabilities.browserName,
          version: config.capabilities.browserVersion
        },
        device: 'Local test machine',
        platform: {
          name: 'windows',
          version: '10'
        }
      },
      displayDuration: true,
    };

    try {
      reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
    } catch (err) {
      if (err) {
        throw new Error('Failed to save cucumber test results to json file.');
      }
    }
  }
}
