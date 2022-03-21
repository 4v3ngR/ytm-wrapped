(function() {
  if (window.adblock === "loaded") return;

  window.adblock = "loaded";
  console.log("loading adblock");

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
