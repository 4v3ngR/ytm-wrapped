(function() {
  console.log("video plugin loaded");
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
        handleLoadedData(null);
      }

      if (!video.eventsAdded) {
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadeddata", handleLoadedData);
        video.eventsAdded = true;
      }
    }
  }

  function handlePlay(e) {
    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
      {
        message: "play"
      }
    ));
  }

  function handlePause(e) {
    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
      {
        message: "pause"
      }
    ));
  }

  function handleTimeUpdate(e) {
    // seems that if we block tracking, we don't get to the end, so let's fake it
    if (video.duration && video.currentTime + 1 >= video.duration) {
      video.dispatchEvent(new Event('ended'));
    }

    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
      {
        message: "timeupdate",
        offset: video.currentTime,
        duration: video.duration
      }
    ));
  }

  function handleLoadedData(e) {
    var image = player.querySelector('.song-image');
    if (image) image = image.querySelector('img');
    if (image) image = image.getAttribute('src');

    var title = document.querySelector('yt-formatted-string.title.style-scope.ytmusic-player-bar');
    if (title) title = title.innerText;

    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
      {
        message: "Loadeddata",
        image,
        title,
      }
    ));
  }

  // add global functions to allow the cordova app to control the video
  var timeout = 0;
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
    },
    ping: function() {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (video && !video.paused) {
          video.pause();
          window.close();
        }
      }, 5000);
    }
  }
})();
