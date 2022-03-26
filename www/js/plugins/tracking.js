(function() {
  if (Image.hooked) return;
  Image.hooked = true;

  function setSrc(src) {
    // block tracking urls through images
    if (src.includes("music.youtube.com/api/stats")) {
      src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRkYAAAAAwAA7JK5lUAAAAASUVORK5CYII=";
    }

    this.setAttribute("src", src);
  }

  function getSrc() {
    return this.getAttribute("src");
  }

  Object.defineProperty(Image.prototype, 'src', {
    get: getSrc,
    set: setSrc,
    configurable: true
  });

  navigator.sendBeacon = function(url, data) {
    // do nothing
    return true;
  }
})();
