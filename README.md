# ytm-wrapped
A simple capacitor app to load yt music and to inject some scripts

## dependencies
capacitor
android cli development tools

## building

### install dependencies
```sh
npm install
```

### debug build (creates an apk ytm-debug.apk)
```sh
npm run debug
```

### release (creates an apk ytm-unsigned.apk)
```sh
npm run release
```

### signing the apk
This is what I use. You'll need to create an appropriate keystore
```sh
apksigner sign --ks my.keystore ./ytm-unsigned.apk
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
