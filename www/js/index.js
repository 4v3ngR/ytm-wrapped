(function() {
  window.inAppBrowserRef = null;

  document.addEventListener('deviceready', onDeviceReady, false);

  var plugins = {
    "fetch.js": null,
    "xmlhttprequest.js": null,
    "background.js": null,
    "adblock.js": null,
    "audioonly.js": null,
    "ui.js": null,
    "controls.js": null
  };

  async function loadPlugin(plugin) {
    console.log("loadPlugin for " + plugin);
    let x = await fetch(`https://localhost/js/plugins/${plugin}`);
    let script = await x.text();
    plugins[plugin] = script;
  }

  function injectPlugin(plugin) {
    let script = plugins[plugin];
    if (script) {
      window.inAppBrowserRef.executeScript({code: script}, () => null);
    }
  }

  async function onDeviceReady() {
    document.getElementById('deviceready').classList.add('ready');
    var keys = Object.keys(plugins);
    for (var i = 0; i < keys.length; i++) {
      await loadPlugin(keys[i]);
    }

    window.inAppBrowserRef = cordova.InAppBrowser.open(
      'https://music.youtube.com',
      '_blank',
      'location=no,hidden=true,hardwareback=yes'
    );
    window.inAppBrowserRef.addEventListener('loadstop', function() {
      window.inAppBrowserRef.insertCSS({code:"body{background-color:black;}"});
      window.inAppBrowserRef.show();
      try {
        console.log("going to inject plugins");
        Object.keys(plugins).forEach((plugin) => injectPlugin(plugin));
      } catch (ex) {
        console.error("got ex", ex.message);
      }
    });
    window.inAppBrowserRef.addEventListener('exit', function() {
      if (navigator.app) {
        navigator.app.exitApp();
      } else if (navigator.device) {
        navigator.device.exitApp();
      } else {
        window.close();
      }
    });

    window.postMessage({ msg: "iab_ready" }, "*");
  }
})();
