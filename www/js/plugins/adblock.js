(function() {
  if (window.adblock === "loaded") return;

  window.adblock = "loaded";
  console.log("loading adblock");

  // TODO: find a self contained youtube music ad blocker that is MIT license compatible
  // the one I had previously was GPL3

  function interceptXHR(url, text) {
    if (url.includes('youtubei/v1/player')) try {
      var obj = JSON.parse(text);
      if (obj.adPlacements) {
        delete obj.adPlacements;
        text = JSON.stringify(obj);
      }
    } catch (ex) {
    }
    return text;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(interceptXHR);
  }
})();
