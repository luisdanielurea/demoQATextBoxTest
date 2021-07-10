const {Before, After, AfterAll, Status} = require('cucumber');
const rimraf = require('rimraf');
import {browser} from 'protractor';
import {BrowserInteractions} from '../browserInteractions';

const browserInteraction = new BrowserInteractions();

Before(async () => {

  await browserInteraction.maximizeBrowser();

  if (await browser.params.headless === 'true') {
    await browserInteraction.resizeBrowser(1600, 1000);
  }

  process.setMaxListeners(0);

});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, 'image/png');
  }
});

AfterAll(async () => {

  // Deleting JavaScript test directory
  rimraf('dist/out-tsc/test', function () {
    console.log('\n\nJavaScript test directory deleted !');
  });

  await browser.quit();
});

