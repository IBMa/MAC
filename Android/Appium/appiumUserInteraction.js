// Require javaScript library for appium
var wd = require('wd');

// Create variable to store hostname location
var remote = {
    local: {
        hostname: "localhost",
        port: 4723
    }
}

// Create enviorment variable with server path
var environment = remote.local;

// Set desired capababilities
var desiredCapabilities = {
    "deviceName": "emulator-5554",
    "platformVersion": "8.0",
    "platformName": 'Android',
    "app": "/Users/aliasghar/Documents/MAC-CASCON2017/Android/MAC_CMD_lib/AccessibilityCmdTestEnabler_Android/DIST/a11y_standuptimer-debug.apk"
}

// Set driver variable
driver = wd.remote(environment);

// Call driver init method to initialize the app 
driver.init(desiredCapabilities, function (err) {

            // Find first input field
            driver.elementById('num_participants', function (err, el) {

                // Type value into first input field
                el.type('0', function () {

                    driver.sleep(5000, function () {

                        driver.elementById('start_button', function (err, button) {

                            button.click(function () {
                                // Wait for 30 seconds
                                driver.sleep(30000, function () {

                                    driver.elementById('finished_button', function (err, button) {

                                        button.click(function () {
                                            // Wait for 5 seconds
                                            driver.sleep(5000, function () {

                                                // Close the app
                                                driver.closeApp();

                                                // Quite the driver
                                                driver.quit();
                                            });
                                        });
                                    });
                                });

                            });
                        });
                    });

                });
            });
        });