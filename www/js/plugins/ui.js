(function() {
  if (window.uichanges === "loaded") return;
  window.uichanges = "loaded";

  var styleTag = document.createElement("style");
  var css = `
  ytmusic-pivot-bar-renderer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 24px;
    background: #202020;
  }
  ytmusic-search-box {
    margin-left: auto;
    margin-right: 48px;
  }
  ytmusic-player-bar {
    bottom: 64px !important;
  }
  #player-bar-background {
    bottom: 64px !important;
  }
  `;

  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
})();
