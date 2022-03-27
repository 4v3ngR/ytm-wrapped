const { App } = require("@capacitor/app");
const { loadPlugins, injectPlugins } = require("./plugins");

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});

App.addListener('appUrlOpen', data => {
  console.log('App opened with URL:', data);
});

App.addListener('appRestoredResult', data => {
  console.log('Restored state:', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();
  console.log('App opened with URL: ' + url);
};

const loadYTM = async () => {
  await loadPlugins();
  if (!window.inAppBrowserRef) {
    window.inAppBrowserRef = cordova.InAppBrowser.open(
      'https://music.youtube.com',
      '_blank',
      'location=no,hidden=true,hardwareback=yes'
    );

    window.inAppBrowserRef.addEventListener('loadstop', function() {
      window.inAppBrowserRef.insertCSS({code:"body{background-color:black;}"});
      try {
        injectPlugins(window.inAppBrowserRef);
      } catch (ex) {
        console.error("got ex", ex.message);
      }
      window.inAppBrowserRef.show();
    });
  }
}

loadYTM();
