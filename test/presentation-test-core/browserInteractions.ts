import {browser, ElementArrayFinder, ElementFinder, ExpectedConditions, Key, protractor} from 'protractor';
import {Helpers} from './helpers';
import {Before} from 'cucumber';

const until = protractor.ExpectedConditions;
const timeout = 30000;
let helper;

Before(async () => {
  helper = new Helpers();
});


export class BrowserInteractions {

  async click(element: ElementFinder) {
    await element.click();
  }


  async doubleClick(element: ElementFinder) {
    await element.click();
    await element.click();
  }


  async waitForAngularEnabled(enabled) {
    await browser.waitForAngularEnabled(enabled);
  }


  async switchToiFrame(element?: ElementFinder) {
    await browser.waitForAngularEnabled(false);

    if (element != null) {
      await browser.switchTo().frame(element.getWebElement());
    }
  }


  async switchFromiFrame() {
    await browser.switchTo().defaultContent();
    await browser.waitForAngularEnabled(true);
  }


  /*
  It selects and returns a random value form a given dropdown
   */
  async clickOnRandomOption(element: ElementArrayFinder) {
    let selectedElement, elementText;
    const _this = this;

    selectedElement = element.count().then(function (numberOfItems) {
      return Math.floor(Math.random() * numberOfItems);
    }).then(async function (randomNumber) {
      const elementToClick: ElementFinder = element.get(randomNumber);
      await _this.browserWaitUntilElementToBeClickable(elementToClick);
      elementText = await _this.getText(element.get(randomNumber));
      await _this.click(element.get(randomNumber));
      return elementText;
    });
    return selectedElement;
  }


  async getText(element: ElementFinder) {
    return await element.getText();
  }


  async getAttribute(element: ElementFinder, value) {
    return await element.getAttribute(value);
  }


  async writeText(element: ElementFinder, text) {
    await element.clear();
    await element.sendKeys(text);
  }


  async isDisplayed(element: ElementFinder) {
    return await element.isDisplayed();
  }


  async isPresent(element: ElementFinder) {
    return await element.isPresent();
  }


  async isEnable(element: ElementFinder) {
    return await element.isEnabled();
  }

  async browserWaitUntilPresenceOf(element: ElementFinder, message?: string) {
    return await browser.wait(until.presenceOf(element), timeout, message);
  }


  async browserWaitUntilVisibilityOf(element: ElementFinder, message?: string) {
    // return await browser.wait(until.visibilityOf(element), timeout, message);
    return await browser.wait(ExpectedConditions.visibilityOf(element));
  }


  async browserWaitUntilInvisibilityOf(element: ElementFinder, message?: string) {
    // return await browser.wait(until.invisibilityOf(element), timeout, message);
    return await browser.wait(ExpectedConditions.invisibilityOf(element));
  }


  async browserWaitUntilElementToBeClickable(element: ElementFinder, message?: string) {
    // return await browser.wait(until.elementToBeClickable(element), timeout, message);
    return await browser.wait(ExpectedConditions.elementToBeClickable(element));
  }


  async browserWaitAndClick(element: ElementFinder, message?: string) {
    await this.browserWaitUntilVisibilityOf(element, message);
    await this.click(element);
  }


  async sleep(msToSleep) {
    await browser.sleep(msToSleep);
  }


  async openURL(url) {
    await browser.get(url);
  }


  async openURLWithBusinessUnit(businessUnit: string) {
    await this.openURL(helper.getEnvironmentUrl(browser.params.env, businessUnit));
  }


  async getURL(businessUnit: string) {
    return helper.getEnvironmentUrl(browser.params.env, businessUnit);
  }

  /**
   * It returns the current url on the browser
   */
  async getBrowserUrl() {
    return await browser.getCurrentUrl();
  }


  /**
   * It gets and returns a random date, from today until +365 days forward
   * @param givenStartDate If given, the random date is searched from this one
   */
  async getRandomDate(givenStartDate ?: Date) {
    const startDate = ((givenStartDate == null) ? new Date() : givenStartDate);
    const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    const randomDate = await new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate;
  }


  /**
   * Given a list of elements, it selects one or a given amount of the random options.
   * @param element The element which contains the options.
   * @param dropdownOptions All the options which are available.
   * @param maxOptions Number of options we desire to choose, by default, 1.
   */
  async selectAmountOfRandomOptions(displayOptions: ElementFinder, dropdownOptions: ElementArrayFinder, maxOptions: number = 1) {
    do {
      await this.click(displayOptions);
      await this.clickOnRandomOption(dropdownOptions);
      maxOptions--;
    } while (maxOptions > 0);
  }


  async pressEnter() {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }


  async pressEnd() {
    await browser.actions().sendKeys(protractor.Key.END).perform();
  }


  async pressTab() {
    await browser.actions().sendKeys(protractor.Key.TAB).perform();
  }


  async pressEscape() {
    await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
  }


  async mouseDownToElement(element: ElementFinder) {
    await browser.actions().mouseDown(element).perform();
  }

  async pressArrowDown() {
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
  }

  async pressArrowUp() {
    await browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
  }

  async pressArrowLeft() {
    await browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
  }

  async pressArrowRight() {
    await browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
  }

  async getListOfWebElements(element: ElementArrayFinder) {
    const listOfWebElements = await element.getWebElements();
    return listOfWebElements;
  }


  async executeJQueryCode(scriptToRun, parameter?) {
    if (parameter != null) {
      await browser.executeScript(scriptToRun, parameter);
    } else {
      await browser.executeScript(scriptToRun);
    }
  }


  async refresh() {
    await browser.refresh();
  }


  async numberOfOpenWindows() {
    const openWindows = browser.getAllWindowHandles().then(function (handles) {
      return handles.length;
    });

    return openWindows;
  }

  async switchToTabPosition(pos) {
    await browser.getAllWindowHandles().then(function (handles) {
        browser.switchTo().window(handles[pos]);
    });
  }

  async closeWindow(pos) {
    await browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[pos]);
      browser.close();
    });
  }

  async resizeBrowser(width, height) {
    await browser.driver.manage().window().setSize(width, height);
  }

  async maximizeBrowser() {
    await browser.driver.manage().window().maximize();
  }
}
