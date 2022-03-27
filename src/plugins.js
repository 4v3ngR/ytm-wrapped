(function() {
  const plugins = {
    "fetch.js": null,
    "xmlhttprequest.js": null,
    "tracking.js": null,
    "background.js": null,
    "adblock.js": null,
    "audioonly.js": null,
    "ui.js": null,
    "controls.js": null
  };

  const loadPlugin = async (plugin) => {
    const x = await fetch(`js/plugins/${plugin}`);
    const script = await x.text();
    plugins[plugin] = script;
  };

  const loadPlugins = async () => {
    const keys = Object.keys(plugins);
    for (let i = 0; i < keys.length; i++) {
      await loadPlugin(keys[i]);
    }
  };

  const injectPlugin = (ref, plugin) => {
    const script = plugins[plugin];
    if (script) {
      ref.executeScript({code: script}, () => null);
    }
  };

  const injectPlugins = (ref) => {
    Object.keys(plugins).forEach((plugin) => injectPlugin(ref, plugin));
  };

  exports = module.exports = { loadPlugins, injectPlugins };
})();
