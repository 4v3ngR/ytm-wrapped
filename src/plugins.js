(function() {
  const plugins = {
    "fetch.js": {
      "src": null,
      "stage": "loadstart"
    },
    "xmlhttprequest.js": {
      "src": null,
      "stage": "loadstart"
    },
    "mediasession.js": {
      "src": null,
      "stage": "loadstart"
    },
    "tracking.js": {
      "src": null,
      "stage": "loadstop"
    },
    "background.js": {
      "src": null,
      "stage": "loadstop"
    },
    "adblock.js": {
      "src": null,
      "stage": "loadstop"
    },
    "audioonly.js": {
      "src": null,
      "stage": "loadstop"
    },
    "ui.js": {
      "src": null,
      "stage": "loadstop"
    },
    "controls.js": {
      "src": null,
      "stage": "loadstop"
    },
    "config.js": {
      "src": null,
      "stage": "loadstop"
    },
    "swipe.js": {
      "src": null,
      "stage": "loadstop"
    }
  };

  const loadPlugin = async (plugin) => {
    const x = await fetch(`js/plugins/${plugin}`);
    const script = await x.text();
    plugins[plugin].src = script;
  };

  const loadPlugins = async () => {
    const keys = Object.keys(plugins);
    for (let i = 0; i < keys.length; i++) {
      await loadPlugin(keys[i]);
    }
  };

  const injectPlugin = (ref, plugin, stage) => {
    const script = plugins[plugin];
    if (script && script.stage === stage) {
      ref.executeScript({code: script.src}, () => null);
    }
  };

  const injectPlugins = (ref, stage) => {
    Object.keys(plugins).forEach((plugin) => injectPlugin(ref, plugin, stage));
  };

  exports = module.exports = { loadPlugins, injectPlugins };
})();
