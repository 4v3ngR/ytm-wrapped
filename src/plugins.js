(function() {
  const plugins = {
    "fetch.js": null,
    "xmlhttprequest.js": null,
    "tracking.js": null,
    "background.js": null,
    "adblock.js": null,
    "audioonly.js": null,
    "ui.js": null
  };

  const loadPlugin = async (plugin) => {
		console.log("loading plugin", plugin);
    const x = await fetch(`js/plugins/${plugin}`);
    const script = await x.text();
    plugins[plugin] = script;
  };

  const loadPlugins = async () => {
		console.log("loading plugins");
    const keys = Object.keys(plugins);
    for (let i = 0; i < keys.length; i++) {
      await loadPlugin(keys[i]);
    }
  };

  const injectPlugin = (ref, plugin) => {
		console.log("injecting plugin", plugin);
    const script = plugins[plugin];
    if (script) {
			console.log("actually injecting plugin");
      ref.executeScript({code: script}, () => null);
    }
  };

  const injectPlugins = (ref) => {
		console.log("injecting plugins");
    Object.keys(plugins).forEach((plugin) => injectPlugin(ref, plugin));
  };

  exports = module.exports = { loadPlugins, injectPlugins };
})();
