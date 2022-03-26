(function() {
  if (window.adblock === "loaded") return;

  window.adblock = "loaded";
  console.log("loading adblock");

  function interceptXHR(state, url, data) {
    if (url.includes('youtubei/v1/player') && state === 'response') try {
      var obj = JSON.parse(data);
      if (obj.adPlacements) {
        delete obj.adPlacements;
        data = JSON.stringify(obj);
      }
      return data;
    } catch (ex) {
    }

    if (state === 'open' && data) {
      if (url.includes('youtubei/v1/log_event')) {
        return false;
      }
    }

    return data;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(interceptXHR);
  }
})();
