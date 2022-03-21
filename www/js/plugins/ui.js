(function() {
  var upsell = document.querySelector('ytmusic-pivot-bar-item-renderer[tab-id="SPunlimited"]');
  if (upsell) {
    upsell.setAttribute("style", "visibility: hidden !important; display: none !important;");
  }

  if (window.uichanges === "loaded") return;
  window.uichanges = "loaded";

  var styleTag = document.createElement("style");
  var css = `
    .next-items-button,
    .previous-items-button {
      visibility: hidden !important;
      display: none !important;
    }
  `;
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
})();
