(function() {
  let thumbnail = null;
  let elapsed = 0;
  let duration = 0;

  var video = null;
  var player = document.querySelector('ytmusic-player');
  if (player) {
    video = player.querySelector('video');
    if (video) {
      if (video.paused) {
        handlePause(null);
      } else {
        handlePlay(null);
      }
      if (video.duration) {
        dispatch('loadeddata');
      }

      if (!video.eventsAdded) {
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.eventsAdded = true;
      }
    }
  }

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
    thumbnail = getBestThumbnail(navigator.mediaSession.metadata.artwork).src;
    dispatch("loadeddata");
  });

  function handleTimeUpdate(e) {
    dispatch("timeupdate");
  }

  function handlePlay(e) {
    dispatch("play");
  }

  function handlePause(e) {
    dispatch("pause");
  }

  function dispatch(message) {
    slider = document.querySelector('tp-yt-paper-slider#progress-bar');
    if (slider) {
      duration = parseInt(slider.getAttribute("aria-valuemax"), 10);
      elapsed = parseInt(slider.getAttribute("aria-valuenow"), 10);
    }

    const { state, meta } = navigator.mediaSession;
    if (meta) {
      const { album, artist, title } = meta;
      webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
        {
          message,
          image: thumbnail,
          album,
          artist,
          title,
          playing: state === "playing",
          elapsed,
          duration
        }
      ));
    }
  }

  // add global functions to allow the cordova app to control the video
  window.controls = {
    play: function() {
      if (video) {
        video.play();
      }
    },
    pause: function() {
      if (video) {
        video.pause();
      }
    },
    next: function() {
      var button = document.querySelector("tp-yt-paper-icon-button.next-button");
      if (button) button.click();
    },
    prev: function() {
      var button = document.querySelector("tp-yt-paper-icon-button.previous-button");
      if (button) button.click();
    },
    playpause: function() {
      if (video) {
        if (video.paused) video.play();
        else video.pause();
      }
    }
  }
})();
