import {protractor} from 'protractor';
import {Before} from 'cucumber';

const until = protractor.ExpectedConditions;
const timeout = 30000;
let helper;
let pageObjectsManager;

Before(async () => {
    pageObjectsManager = new PageObjectsManager();
});

export class PageObjectsManager {

    private static pageObjectsManager = new PageObjectsManager();
    private pageObjectsArray: Array<string>;

    getInstance(){
        return PageObjectsManager.pageObjectsManager;
    }

    getArray(){
        return (this.pageObjectsArray==null)? this.pageObjectsArray = new Array<string>():this.pageObjectsArray;
    }

}
