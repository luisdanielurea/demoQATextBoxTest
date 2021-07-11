
This repo contains

/test/presentation-test-core
  Core classes functions for general frontend testing with typescript
  
/test/resources/config/config.ts
  Configuration file for test execution and reporting
  
/test/resources/data/environmentUrls.json
  Enviroment management for URLs
  
/test/resources/features
  Feature files for test scenarios
  
/test/resources/pages
  Test execution classes
  
test/resources/stepdefinitions
  Definition of feature file scenarios and calling of execution methods
  

  

-------------------------------------------------------------------------------------

To executes test scenarios you need to:

1 - Clone repo into local
git clone https://github.com/luisdanielurea/demoQATextBoxTest

2 - Open project as node.js

3 - Run the following commands in terminal to install packages and compile

npm install
npm run webdriver-clean
webdriver-manager update --versions.chrome={local Google Chrome version}

![image](https://user-images.githubusercontent.com/10211692/125174470-0f377900-e1c6-11eb-917e-0bedaa7a781f.png)


4 - To run test

npm run presentation-test-clean-build && npm run presentation-test -- --params.headless=true 
