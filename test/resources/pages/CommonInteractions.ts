

require('events').EventEmitter.npmdefaultMaxListeners = 15;
import {Before} from 'cucumber';
import {BrowserInteractions} from '../../presentation-test-core/browserInteractions';
import { Helpers }  from '../../presentation-test-core/helpers';
import {browser, by, element} from 'protractor';

const timeout = 10000;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;

let browserInteraction;
let helper;

const textBoxUrl = "https://demoqa.com/text-box"


Before(async () => {
    browserInteraction = new BrowserInteractions();
});

export class CommonInteractions {

    async writeText(object, text){
        await browserInteraction.writeText(object,text);
    }

    async getText(object){
        return await browserInteraction.getText(object);
    }
}
