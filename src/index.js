const { App } = require("@capacitor/app");
const { BackgroundTask } = require('@robingenz/capacitor-background-task');
const { loadPlugins, injectPlugins } = require("./plugins");
const controls = require("./controls");

App.addListener('appStateChange', async ({ isActive }) => {
  if (isActive) {
    return;
  }
  // The app state has been changed to inactive.
  // Start the background task by calling `beforeExit`.
  const taskId = await BackgroundTask.beforeExit(async () => {
    if (MusicControls) try {
      MusicControls.destroy(() => null, () => null);
    } catch (ex) {}
    if (window.inAppBrowserRef) try {
      winddow.inAppBrowserRef.close();
    } catch (ex) {}
    // Finish the background task as soon as everything is done.
    BackgroundTask.finish({ taskId });
  });

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
      controls.init(window.inAppBrowserRef);
    });
  }
}

loadYTM();
