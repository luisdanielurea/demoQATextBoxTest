

require('events').EventEmitter.npmdefaultMaxListeners = 15;
import {Before} from 'cucumber';
import {BrowserInteractions} from '../../presentation-test-core/browserInteractions';
import {Helpers}  from '../../presentation-test-core/helpers';
import {CommonInteractions} from '../pages/CommonInteractions'
import {browser, by, element, protractor} from 'protractor';


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;

let browserInteraction;
let helper;
let commonInteraction;

const textBoxUrl = "https://demoqa.com/text-box";

let fullNameTextBox;
let fullNameOutput;
let fullNameText:string;

let emailTextBox;
let emailOutput;
let emailText:string;
let emailError;

let currentAddressTextBox;
let currentAddressOutput;
let currentAddressText:string;

let permanentAddressTextBox;
let permanentAddressOutput;
let permanentAddressText:string;


let submitButton;

let tabNumber:number;


Before(async () => {
    browserInteraction = new BrowserInteractions();
    commonInteraction = new CommonInteractions();
    helper = new Helpers();
    
    fullNameTextBox = await element(by.id('userName'));
    emailTextBox = await element(by.id('userEmail'));
    currentAddressTextBox = await element(by.xpath('//textarea[@id="currentAddress"]'));
    permanentAddressTextBox = await element(by.xpath('//textarea[@id="permanentAddress"]'));

    fullNameOutput = await element(by.xpath('//p[@id="name"]'));
    emailOutput = await element(by.xpath('//p[@id="email"]'));
    currentAddressOutput = await element(by.xpath('//p[@id="currentAddress"]'));
    permanentAddressOutput = await element(by.xpath('//p[@id="permanentAddress"]'));

    emailError = await element(by.xpath('//input[@id="userEmail" and @class="mr-sm-2 field-error form-control"]'));

    fullNameText = "";
    emailText = "";
    currentAddressText = "";
    permanentAddressText = "";

    submitButton = await element(by.id('submit'));

    tabNumber = 0;
});

export class TextBoxInteractions {
    
    async openTextBoxPage(){
        console.log("Open " + textBoxUrl);
        await browserInteraction.waitForAngularEnabled(false);
        await browserInteraction.openURL(textBoxUrl);
    }

    async fullNameRandom(){
        console.log("Generate random name");
        let firstName:string = helper.randomMaxString(9);
        let lastName:string = helper.randomMaxString(9);
        fullNameText = firstName + ' ' + lastName;
        console.log("Write full name " + fullNameText);
        await commonInteraction.writeText(fullNameTextBox,fullNameText);
        tabNumber = 4;
    }

    async emailRandom(){
        console.log("Generate random email");
        emailText = helper.randomEmail();
        console.log("Write email " + emailText);
        await commonInteraction.writeText(emailTextBox,emailText);
        tabNumber = 3;
    }

    async currentAddressRandom(){
        currentAddressText = await this.randomAddress();
        console.log("Write current address " + currentAddressText);
        await commonInteraction.writeText(currentAddressTextBox,currentAddressText);
        tabNumber = 2;
    }

    async permanentAddressRandom(){
        permanentAddressText = await this.randomAddress();
        console.log("Write permanent address " + currentAddressText);
        await commonInteraction.writeText(permanentAddressTextBox,permanentAddressText);
        tabNumber = 1;
    }
   
    async randomAddress(){

        console.log("Generate random address");
        let addressLine1:string = helper.randomMaxString(20);
        let addressLine2:string = helper.randomMaxString(10);
        let addressLine3:string = helper.randomNumberLowerMaximum(10000,99999).toString();
        let addressLine4:string = helper.randomMaxString(10);

        return addressLine1 + '\n' + addressLine2 + '\n' + addressLine3 + '\n' + addressLine4;
    }

    async submitTextBox(){
        console.log("Click on submit button");
        await browser.executeScript('arguments[0].click();', submitButton);
    }
    
    async verifyOutput(){

        console.log("Press tabs for output visibility");
        for (let i = 0; i < tabNumber; i++) {
            await browserInteraction.pressTab(); 
        }

        console.log("Wait for output visibility");
        await browserInteraction.sleep(2*1000);
        
        await this.verifyFullName(!(fullNameText === ""));
        await this.verifyEmail(!(emailText === ""));
        await this.verifyCurrentAddress(!(currentAddressText === ""));
        await this.verifyPermanentAddress(!(permanentAddressText === ""));
    }

    async verifyFullName(expected:boolean){
        if(expected) {
            console.log("Verify correct name output");
            await assert.equal(await fullNameOutput.getText(), "Name:" + fullNameText.replace(/  +/g, ' ').replace(/\s*$/,""));
        }else{
            console.log("Verify that name output must not be present");
            await assert.isNotTrue(await fullNameOutput.isPresent());
        }
    }

    async verifyEmail(expected:boolean){
        if(expected) {
            console.log("Verify correct email output");
            await assert.equal(await emailOutput.getText(), "Email:" + emailText);
        }else{
            console.log("Verify that email output must not be present");
            await assert.isNotTrue(await emailOutput.isPresent());
        }
    }

    async verifyCurrentAddress(expected:boolean){
        if(expected) {
            console.log("Verify correct current address output");
            let currentAddressTextNoEnter = await currentAddressText.toString().replace(/[\r\n]+/g, " ").replace(/  +/g, ' ').replace(/\s*$/,"");
            await assert.equal(await currentAddressOutput.getText(), "Current Address :" + currentAddressTextNoEnter);
        }else{
            console.log("Verify that current address output must not be present");
            await assert.isNotTrue(await currentAddressOutput.isPresent());
        }
    }

    async verifyPermanentAddress(expected:boolean){
        if(expected) {
            console.log("Verify permanent address output // original output has typos");
            let permanentAddressTextNoEnter = await permanentAddressText.toString().replace(/[\r\n]+/g, " ").replace(/  +/g, ' ').replace(/\s*$/,"");
            await assert.equal(await permanentAddressOutput.getText(), "Permananet Address :" + permanentAddressTextNoEnter);
        }else{
            console.log("Verify that permanent address output must not be present");
            await assert.isNotTrue(await permanentAddressOutput.isPresent());
        }
    }


    async incorrectEmail(){
        console.log("Generate random incorrect email text format");
        emailText = helper.randomMaxString(20);
        await commonInteraction.writeText(emailTextBox,emailText);
    }


    async verifyEmailError(){
        console.log("Verify that email input is red colored");
        await assert.isTrue(await emailError.isPresent());
    }

}
