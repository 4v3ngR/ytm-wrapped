const { App } = require("@capacitor/app");
const { BackgroundTask } = require('@robingenz/capacitor-background-task');
const { loadPlugins, injectPlugins } = require("./plugins");
const controls = require("./controls");

App.addListener('appStateChange', async ({ isActive }) => {
  if (isActive) {
    return;
  }
  const taskId = await BackgroundTask.beforeExit(async () => {
    if (MusicControls) try {
      MusicControls.destroy(() => null, () => null);
    } catch (ex) {}
    if (window.inAppBrowserRef) try {
      winddow.inAppBrowserRef.close();
    } catch (ex) {}
    BackgroundTask.finish({ taskId });
  });

});

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
