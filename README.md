# Mobile Accessibility Checker - CASCON 2017

Instructions how to use MAC for Accessibility checking on mobile Apps 
This the purpose of this workshop/demo, Mac OS will be used as the platform.

### Pre-requisites:
- Android Studio
- Android Emulator/AVD created
- JAVA (1.8 or	later)

### Step 1. Download MAC Android CMD Lib
1. Goto https://mac-server-cascon-2017.stage1.mybluemix.net/home
2. Click on `Download MAC Command Scripts for Android` to download MAC CDM lib in Android section
3. Unzip downloaded `AccessibilityCmdTestEnabler_Android.zip` file

### Step 2. Start Android Emulator
1. Run command `emulator -list-avds` to list available avds
2. Run command `/<path to Android SDK>/emulator/emulator -avd <avd name>` 

### Step 3. Build apk
1. cd to apps root folder
2. Run command `./gradlew assembleDebug` to build apk
3. Verify that apk is generated at `<app name>/<app name>/build/outputs/apk/<app name>-debug.apk`

### Step 4. Build A11Y apk
1. cd into folder `AccessibilityCmdTestEnabler_Android` from step 1
2. Run command `./android_run.sh -apk <App apk Path>  -sdk <Android SDK Path>`
    This will create a11y apk under `DIST` folder

### Step 5. Install A11Y apk to Emulator/Device
1. Run command `adb devices` to find running emulator/devices
2. Run command `adb -s <emulator name> install DIST/a11y_<app name>-debug.apk`

### Step 6. Generate Accessibility Report
1. Open app in emulator/device
2. Perform UI interaction on the app
     This is will generate A11Y report on the server side.

### Step7. View Accessibility Report
1. Goto https://mac-server-cascon-2017.stage1.mybluemix.net/home
2. Refresh page - if already opened
3. Located reported generated in Android section


