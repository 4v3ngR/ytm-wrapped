# ytm-wrapped
A simple cordova app to load yt music and to inject some scripts

## dependencies
cordova
android cli development tools
bundle tool

## building

### debug build (creates an apke in platforms/android/app/build/outputs/apk/debug/app-debug.apk)
```sh
cordova platform add android
```
or
```sh
npm run build:debug
```

### release (creates a bundle file in android/app/build/outputs/bundle/release/app-release.aab)
* this requires bundletool
```sh
npm run build:release
```

### release apk: (creates a zip file containing a universal apk)
```sh
npm run package:release
```

## plugins
* plugins are stored in www/js/plugins. They're injected into the browser after the browser has loaded
* the plugin list is in www/js/index.js

## XHR/Fetch intercepting
I've added some code that will allow plugins to receive the responses to XMLHttpRequests and Fetch requests. This has allowed a new adblock plugin to be created (it filters out the ad details from the player response). The functionality to intercept the responses, and make changes, should allow for some good plugins.

## Releases
Here's the link to the releases page https://github.com/4v3ngR/ytm-wrapped/releases

## Notes
* Adblocking now works with XHR interception
* Background works when playing audio. If playing a video, the video will pause. Noting that videos can actually start while the app is in the background
* I'm not an android developer.
