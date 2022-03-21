(function() {
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
