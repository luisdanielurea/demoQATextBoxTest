import {Then, When, Given, Before, After} from 'cucumber';
import {TextBoxInteractions} from '../pages/TextBoxInteractions';


let textBoxInteraction;
let {setDefaultTimeout} = require('cucumber');


Before(async () => {
    setDefaultTimeout(300 * 1000);
    textBoxInteraction = new TextBoxInteractions();
    
});

Given('Open QA Demo text box page', async () => {
    await textBoxInteraction.openTextBoxPage();

});

When('Input random name on Full Name Box', async () => {
    await textBoxInteraction.fullNameRandom();
});

When('Input random email on Email Box', async () => {
    await textBoxInteraction.emailRandom();
});

When('Input random address on Current Address', async () => {
    await textBoxInteraction.currentAddressRandom();
});

When('Input random address on Permanent Address', async () => {
    await textBoxInteraction.permanentAddressRandom();
});

When('Click on submit button', async () => {
    await textBoxInteraction.submitTextBox();
});

When('Input an incorrect email format', async () => {
    await textBoxInteraction.incorrectEmail();
});

Then('The Output values must fit inputs', async () => {
    await textBoxInteraction.verifyOutput();
});

Then('Email input shows an error', async () => {
    await textBoxInteraction.verifyEmailError();
});




