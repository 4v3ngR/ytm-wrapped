(function() {
  if (window.audioonly === "loaded") return;
  window.audioonly = "loaded";
  console.log("loading audioonly");

  function getBestThumbnail(thumbnails) {
    let res = { sizes: "1" };
    for (let i = 0; i < thumbnails.length; i++) {
      if (parseInt(thumbnails[i].sizes, 10) > parseInt(res.sizes, 10)) {
        res = thumbnails[i];
      }
    }
    return res;
  }

  window.addEventListener("mediahaschanged", (e) => {
    const thumbnail = getBestThumbnail(navigator.mediaSession.metadata.artwork);
    if (thumbnail) {
      const player = document.querySelector("ytmusic-player");
      if (player) {
        let cover = player.querySelector("img#cover-image");
        if (!cover) {
          const img = player.querySelector("img#img");
          if (img) {
            cover = document.createElement("img");
            cover.setAttribute("id", "cover-image");
            cover.setAttribute("class", "style-scope yt-img-shadow");
            cover.setAttribute("style", "height: 100%; object-fit: scale-down;");
            img.parentNode.replaceChild(cover, img);
          }
        }

        if (cover) cover.setAttribute("src", thumbnail.src);

        const content = document.querySelector('div.content');
        if (content) {
          let background = document.querySelector('div#background-image');
          if (!background) {
            background = document.createElement('div');
            background.setAttribute("id", "background-image");
            background.setAttribute("class", "background-image");
            content.setAttribute("style", "background: transparent");
            content.parentNode.insertBefore(background, content);
          }
          if (background) {
            background.setAttribute("style", `background-image: url('${thumbnail.src}'); background-position: center;`);
          }
        }

        player.removeAttribute("video-mode_");
      }
    }
  });

  function forceAudioOnly(state, url, data) {
    if (url.includes('youtubei/v1/player') && state === 'response') try {
      var obj = JSON.parse(data);
      if (obj.videoDetails) {
        obj.videoDetails.musicVideoType = "MUSIC_VIDEO_TYPE_ATV";
        data = JSON.stringify(obj);
      }
      return data;
    } catch (ex) {}
    return data;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(forceAudioOnly);
  }
})();
