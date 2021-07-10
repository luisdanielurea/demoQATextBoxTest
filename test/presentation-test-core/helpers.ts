import {browser} from 'protractor';

const fileSystem = require('fs');
const dateFormat = require('dateformat');
const faker = require('faker');
const fs = require('fs');
const possibleString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ- abcdefghijklmnopqrstuvwxyz- ';
const specialCharacters = 'ÁÉËÍÓÖÚÜáéëíóöúüŐőŰű ÂâĂăÎîşŞţŢ Çç';
let text;

export class Helpers {

  /**
   * Given a number, the function returns a random number with a desire length
   * @param desireLength Length for the returned random number
   */
  randomNumberGivenLength(desireLength: number): number {

    let minLength = 1;
    let maxLength = 9;

    while (desireLength > 1) {
      minLength *= 10;
      maxLength *= 10;
      desireLength--;
    }

    return Math.floor(minLength + Math.random() * maxLength);
  }


  /**
   * Return a random number between a minimum number (or 1 as default) and the given maximum number
   * @param maximum Biggest number to be returned
   * @param minimum Smallest number to be returned
   */
  randomNumberLowerMaximum(maximum, minimum = 1) {
    return Math.floor((Math.random() * (maximum - minimum)) + minimum);
  }


  /**
   * Given a number, the function returns a random string with that desire length
   * @param desireLength Length for the returned random string
   */
  randomString(desireLength: number) {
    text = '';
    for (let i = 0; i < desireLength; i++) {
      text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
    }

    return text;
  }


  /**
   * Given a number, the function returns a random string with that desire length
   * @param desireLength Length for the returned random string
   */
  randomStringSpecialCharacters(desireLength: number) {
    text = '';
    for (let i = 0; i < desireLength; i++) {
      text += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }

    return text;
  }


  /**
   * Given a number, the function returns a random string with a length from 1 to that maximum length
   * @param maxLength Maximum length for the string
   */
  randomMaxString(maxLength: number) {
    text = '';
    const randomMaxLength = Math.floor(Math.random() * maxLength) + 1;

    // for (let i = 0; i < randomMaxLength; i++) {
    //   text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
    // }
    // return text;
    return this.randomString(randomMaxLength);
  }

  /**
   * Given a list of elements, the function counts the number of them chooses one of them randomly
   * @param availableElements list of elements
   */
  countElementsChoosesRandom(availableElements) {

    let sum;
    let randomReturned;

    randomReturned = availableElements.count().then(function (count) {
      sum = count - 1; //to get position 0
      return Math.floor(Math.random() * sum);
    });
    return randomReturned;
  }


  /**
   * The function returns a random char from A to Z
   * */
  randomChar() {

    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    string = letters.charAt(Math.floor(Math.random() * letters.length));

    return string;

  }

  randomEmail() {
    return faker.internet.email();
  }


  /**
   * Gets and retuns the current date with a given format. For example: dd_mm_yyyy-HH_MM_ss -> 07_03_2019-09_15_00
   * @param format
   */
  getCurrentDateTime(format) {
    return dateFormat(new Date(), format);
  }


  returnDateGivenFormat(date, format) {
    return dateFormat(date, format);
  }


  /**
   * Transform a date with a different format and separators to a date which could be formatter to dd-mm-yyyy correctly
   * @param date
   * @param separator
   */
  transformDateFromDifferentFormat(date, separator) {
    const day = date.substr(0, date.indexOf(separator));
    date = date.substr(date.indexOf(separator) + 1);
    const month = date.split(separator)[0] - 1;
    const year = date.split(separator)[1];
    const newDate = new Date().setFullYear(year, month, day);

    return newDate;
  }


  /**
   * Given the Environment for the suite and the Business Unit, it returns the correct url.
   * @param environment Where the code will be executed [uat, int, preprod]
   * @param businessUnit Country [HU, DE, AT...]
   */
  getEnvironmentUrl(environment, businessUnit?) {
    const urlsFile = JSON.parse(fileSystem.readFileSync(browser.params.environmentUrl, 'utf8'));

    if (businessUnit == null) {
      return urlsFile[environment.toLowerCase()];
    } else {
      return urlsFile[environment.toLowerCase()][businessUnit];
    }
  }


  /**
   * Given a string, see if it's an integer
   *
   * @param variable string
   * @return true or false
   */
  variableIsInt(variable) {
    if (variable === parseInt(variable)) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * It creates a json file from a given object
   * @param object Desired object to save in a json file
   * @param filePath Path where the file will be located, with .json extension
   */
  createJsonFileFromObject(object, filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(object, null, 2));
    } catch (e) {
      throw e;
    }
  }


  /**
   * Given a path to the json file return the parse.
   * @param jsonPath
   */
  getJsonParse(jsonPath) {
    return JSON.parse(fileSystem.readFileSync(jsonPath, 'utf8'));
  }

}
