(function() {
  var upsell = document.querySelector('ytmusic-pivot-bar-item-renderer[tab-id="SPunlimited"]');
  if (upsell) {
    upsell.setAttribute("style", "visibility: hidden !important; display: none !important;");
  }

  document.querySelectorAll("style").forEach(style => {
    let text = style.innerHTML;
    style.innerHTML = text.replace(/935px/g, '617px').replace(/936px/g, '618px');
  });

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
