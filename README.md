
# The Appylar React Native SDK sample app

This app contains a simple implementation of the Appylar React Native SDK. Before you start the app, add a valid app key from an app registered on your Appylar account in the initialization function. Also, make sure to set the correct bundle id for your app in your IDE.

Please read the full documentation of the SDK on our [website](https://www.appylar.com/).

If you have any questions or suggestions regarding the SDK, please contact us at [support@appylar.com](mailto:support@appylar.com).



# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start Metro, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator, provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
