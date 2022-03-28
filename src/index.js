const { App } = require("@capacitor/app");
const { loadPlugins, injectPlugins } = require("./plugins");
const controls = require("./controls");

let ref = null;

App.addListener('appStateChange', async ({ isActive }) => {
	console.log("appStateChange", isActive);
  if (ref) {
    ref.executeScript(
      {
        code: `window.postMessage({ message: 'statechanged', active: ${isActive}});`
      },
      () => null
    );
  }
});

const loadYTM = async () => {
  await loadPlugins();
  if (!ref) {
    ref = cordova.InAppBrowser.open(
      'https://music.youtube.com',
      '_blank',
      'location=no,hidden=true,hardwareback=yes'
    );

    ref.addEventListener('loadstop', function() {
      ref.insertCSS({code:"body{background-color:black;}"});
      try {
        injectPlugins(ref);
      } catch (ex) {
        console.error("got ex", ex.message);
      }
      ref.show();
      controls.init(ref);
    });
  }
}

loadYTM();
