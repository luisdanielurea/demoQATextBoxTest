@qaDemo
Feature: Text box validation for QA Demo

  Background:
    Given Open QA Demo text box page


  Scenario: Fill all values on text boxes
    When Input random name on Full Name Box
    And Input random email on Email Box
    And Input random address on Current Address
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill all values except Permanent Address on text boxes
    When Input random name on Full Name Box
    And Input random email on Email Box
    And Input random address on Current Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill all values except Current Address on text boxes
    When Input random name on Full Name Box
    And Input random email on Email Box
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill all values except Email on text boxes
    When Input random name on Full Name Box
    And Input random address on Current Address
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill all values except Name on text boxes
    And Input random email on Email Box
    And Input random address on Current Address
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill Name and Email only
    When Input random name on Full Name Box
    And Input random email on Email Box
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill name and current address only
    When Input random name on Full Name Box
    And Input random address on Current Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill name and permanent address only
    When Input random name on Full Name Box
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill email and current address only
    When Input random email on Email Box
    And Input random address on Current Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill email and permanent address only
    When Input random email on Email Box
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill current and permanent adresses only
    When Input random address on Current Address
    And Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill full name only
    When Input random name on Full Name Box
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill email only
    When Input random email on Email Box
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill current address only
    When Input random address on Current Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill permanent address only
    When Input random address on Permanent Address
    And Click on submit button
    Then The Output values must fit inputs


  Scenario: Fill an incorrect email format
    When Input an incorrect email format
    And Click on submit button
