(function() {
  const initStaticStyle = () => {
    let upsell = document.querySelector('ytmusic-pivot-bar-item-renderer[tab-id="SPunlimited"]');
    if (upsell) {
      upsell.setAttribute("style", "visibility: hidden !important; display: none !important;");
    }

    let signin = document.querySelector('a.sign-in-link.style-scope.ytmusic-nav-bar');
    if (signin) {
      signin.setAttribute("style", "padding: 0px 4px 0px 4px;border-radius: 20px;");
      signin.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="#707070"><path d="M3,3v18h18V3H3z M20,20H4v-0.08c0.44-3.2,2.87-5.74,7.28-5.99C9.42,13.59,8,11.96,8,10c0-2.21,1.79-4,4-4 c2.21,0,4,1.79,4,4c0,1.96-1.42,3.59-3.28,3.93c4.41,0.25,6.84,2.8,7.28,5.99V20z"></path></svg>';
    }

    document.querySelectorAll("style").forEach(style => {
      let text = style.innerHTML;
      style.innerHTML = text.replace(/935px/g, '617px').replace(/936px/g, '618px');
    });

    if (window.uichanges === "loaded") return;
    window.uichanges = "loaded";

    let styleTag = document.createElement("style");
    let css = `
      .next-items-button,
      .previous-items-button {
        visibility: hidden !important;
        display: none !important;
      }
      ytmusic-av-toggle,
      ytmusic-mealbar-promo-renderer {
        visibility: hidden !important;
        display: none !important;
      }
      div#extraControls {
        position: relative;
        left: 0px;
        right: 0px;
        height: 32px;
        overflow: hidden;
        display: flex;
      }
      tp-yt-paper-slider {
        width: calc(100% - 100px) !important;
      }
      ytmusic-like-button-renderer {
        display: inherit !important;
      }
      .dislike, .like {
        width: 32px !important;
        height: 32px !important;
        padding: 4px !important;
      }
      @media (min-width: 618px) and (max-width: 1149px) {
        div#extraControls {
          position: fixed !important;
          top: 0px;
        }
        .dislike, .like {
          width: 40px !important;
          height: 40px !important;
          padding: 8px !important;
        }
        .dislike > #icon, .like > #icon {
          width: 24px !important;
          height: 24px !important;
        }
      }
    `;
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
  };

  const setupPlayerPage = () => {
    const playerPage = document.querySelector("ytmusic-player-page");
    if (playerPage) {
      let extraControls = playerPage.querySelector("div#extraControls");
      if (!extraControls){
        extraControls = document.createElement("div");
        extraControls.setAttribute("id", "extraControls");
        const mainPanel = playerPage.querySelector("div#main-panel");
        mainPanel.parentNode.insertBefore(extraControls, mainPanel.nextSibling);

        const expandingMenu = document.querySelector("ytmusic-player-expanding-menu");
        if (expandingMenu) {
          let node = expandingMenu.firstChild;
          while (node) {
            const nextSibling = node.nextSibling;
            expandingMenu.removeChild(node);
            extraControls.appendChild(node);
            node = nextSibling;
          }
        }
        const likeButtonRenderer = document.querySelector('ytmusic-like-button-renderer#like-button-renderer');
        if (likeButtonRenderer) {
          likeButtonRenderer.parentNode.removeChild(likeButtonRenderer);
          extraControls.appendChild(likeButtonRenderer);
        }
      }

      const progressBar = playerPage.querySelector("tp-yt-paper-slider#progress-bar")
      if (progressBar) progressBar.setAttribute("focused", "");
    }
  };

  initStaticStyle();
  setupPlayerPage();
})();
