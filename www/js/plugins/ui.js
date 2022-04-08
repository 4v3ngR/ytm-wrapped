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

    let styleTag = document.querySelector("style#staticStyles");
    if (styleTag) return;

    styleTag = document.createElement("style");
    styleTag.setAttribute("id", "staticStyles");

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
        padding-top: 16px;
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
      @media (max-width: 617px) {
        div#song-media-controls,
        div#song-image {
          background: transparent !important;
          position: fixed !important;
          left: 0px !important;
          top: 16px !important;
          width: 100% !important;
          height: 56.25vw !important;
          padding: 0px !important;
        }
        div#main-panel {
          padding: 0px 84px !important;
        }
        div.content {
          padding-top: 24px !important;
        }
        ytmusic-app-layout[expanded-controls] div#extraControls {
          padding-top: 0px;
          position: absolute;
          top: 56.25vw;
          bottom: 40px;
          height: auto;
        }
        ytmusic-app-layout[expanded-controls] tp-yt-paper-slider {
          position: absolute;
          height: 32px;
          left: 0px;
          bottom: 10px;
          width: calc(100% - 32px) !important;
        }
        ytmusic-app-layout[expanded-controls] tp-yt-paper-icon-button#expand-volume {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
        ytmusic-app-layout[expanded-controls] tp-yt-paper-icon-button#expand-shuffle {
          position: absolute;
          top: 219px;
          right: 48px;
        }
        ytmusic-app-layout[expanded-controls] tp-yt-paper-icon-button#expand-repeat {
          position: absolute;
          top: 219px;
          left: 48px;
        }
        ytmusic-app-layout[expanded-controls] ytmusic-like-button-renderer#like-button-renderer {
          position: absolute;
          left: 40px;
          width: auto;
          right: 40px;
          top: 92px;
          display: flex !important;
          flex-direction: row;
          justify-content: space-between;
        }
        ytmusic-app-layout[expanded-controls] div.side-panel {
          position: absolute !important;
          top: calc(100vh - 207px) !important;
        }
        ytmusic-app-layout[player-page-open_][expanded-controls] div.left-controls-buttons {
          position: fixed;
          top: calc(-100vh + 56.25vw + 330px);
          left: 80px;
          right: 80px;
          height: 64px;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
        ytmusic-app-layout[player-page-open_][expanded-controls] tp-yt-paper-icon-button#play-pause-button {
          width: 64px;
          height: 64px;
        }
        ytmusic-app-layout[player-page-open_][expanded-controls] tp-yt-paper-slider#progress-bar {
          position: fixed;
          top: calc(-100vh + 56.25vw + 460px);
          width: auto !important;
          left: 48px;
          right: 48px;
        }
        ytmusic-app-layout[player-page-open_][expanded-controls] div.content-info-wrapper.style-scope.ytmusic-player-bar {
          position: fixed;
          top: calc(-100vh + 56.25vw + 215px);
          align-items: center;
          left: 78px;
          right: 66px;
        }
        ytmusic-app-layout[player-page-open_][expanded-controls] div.middle-controls-buttons {
          position: fixed;
          left: 8px;
        }
      }
      @media (min-width: 618px) {
        div#song-image {
          height: 52vh;
          padding: 0px !important;
        }
        div#extraControls {
          position: fixed !important;
          top: -8px;
          padding: 0px;
          height: 32px !important;
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
      tp-yt-paper-icon-button.expand-button {
        visibility: hidden;
        display: none;
      }
      tp-yt-paper-icon-button {
        outline: none !important;
      }
      div#av-id {
        display: none !important;
      }
      div.background-image {
        position: fixed;
        width: 100vw;
        height: 100vh;
        opacity: 0.2;
        filter: blur(8px);
      }
      ytmusic-player-bar,
      div#player-bar-background {
        background: black !important;
      }
    `;
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
  };

  let showingExpandedControls = false
  const showExpandedControls = () => {
    const node = document.querySelector("ytmusic-app-layout");
    if (node) {
      console.log("showing expanded controls");
      showingExpandedControls = true;
      node.setAttribute("expanded-controls", "");
    }
  };

  const hideExpandedControls = () => {
    const node = document.querySelector("ytmusic-app-layout");
    if (node) {
      console.log("hiding expanded controls");
      showingExpandedControls = false;
      node.removeAttribute("expanded-controls");
    }
  };

  let clickedTab = null;
  const toggleSidePanel = (tab) => {
    const node = document.querySelector("ytmusic-app-layout");
    if (node.hasAttribute("expanded-controls")) {
      hideExpandedControls();
    } else if (tab === clickedTab) {
      showExpandedControls();
    }
    clickedTab = tab;
  };

  const onTabBarClicked = (e) => {
    toggleSidePanel(e.target);
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

      const tabBar = document.querySelector('tp-yt-paper-tabs > #tabsContainer');
      if (tabBar) {
        showExpandedControls();
        console.log("creating event listener");
        tabBar.addEventListener('click', onTabBarClicked);
      }

      const progressBar = playerPage.querySelector("tp-yt-paper-slider#progress-bar")
      if (progressBar) progressBar.setAttribute("focused", "");
    }
  };

  initStaticStyle();

  if (window.uichanges === "loaded") return;
  window.uichanges = "loaded";

  setupPlayerPage();
})();
