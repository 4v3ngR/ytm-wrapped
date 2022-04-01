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
        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("timeupdate", handleTimeupdate);
        video.eventsAdded = true;
      }
    }
  }

  function handlePlay(e) {
    dispatch("play");
  }

  function handlePause(e) {
    dispatch("pause");
  }

  function handleLoadedData(e) {
    dispatch("loadeddata");
  }

  function handleTimeupdate(e) {
    dispatch("timeupdate");
  }

  function dispatch(message) {
    var image = document.querySelector("div#song-image");
    if (image) image = image.querySelector('img');
    if (image) image = image.getAttribute('src');

    var title = document.querySelector('yt-formatted-string.title.style-scope.ytmusic-player-bar');
    if (title) title = title.innerText;

    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(
      {
        message,
        image,
        title,
        playing: !video.paused,
        elapsed: video.currentTime * 1000,
        duration: video.duration * 1000
      }
    ));
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
