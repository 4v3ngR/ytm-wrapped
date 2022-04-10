const { App } = require("@capacitor/app");
const { loadPlugins, injectPlugins } = require("./plugins");
const controls = require("./controls");

let ref = null;

App.addListener('appStateChange', async ({ isActive }) => {
  if (ref) {
    ref.executeScript(
      {
        code: `window.postMessage({ message: 'statechanged', active: ${isActive}});`
      },
      () => null
    );
  }
});

const setStatus = (text) => {
  const splash = document.querySelector('#status');
  if (splash) {
    splash.innerText = text;
  }
}

const loadstopHandler = () => {
  ref.insertCSS({code:"body{background-color:black;}"});
  try {
    injectPlugins(ref, "loadstop");
  } catch (ex) {
    console.error("got ex", ex.message);
  }
  ref.show();
  controls.init(ref);
}

const loadstartHandler = () => {
  try {
    injectPlugins(ref, "loadstart");
  } catch (ex) {
    console.error("got ex", ex.message);
  }
}

const exitHandler = () => {
  setStatus("exiting...");
  App.exitApp();
}

const loadYTM = async () => {
  if (!ref) {
    ref = cordova.InAppBrowser.open(
      'https://music.youtube.com/?source=pwa',
      '_blank',
      'location=no,hidden=true,hardwareback=yes'
    );

    ref.addEventListener('loadstart', loadstartHandler);
    ref.addEventListener('loadstop', loadstopHandler);
    ref.addEventListener('exit', exitHandler);
  }
}

const main = async () => {
  await loadPlugins();
  loadYTM();
}

main();
