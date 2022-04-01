(function() {
  let elapsed = 0;
  let duration = 0;
  let dodgyTimeUpdateInterval = 0;

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
        video.eventsAdded = true;
      }
    }
  }

  function handlePlay(e) {
    dispatch("play");
    if (!dodgyTimeUpdateInterval) {
      dodgyTimeUpdateInterval = setInterval(() => {
        slider = document.querySelector('tp-yt-paper-slider#progress-bar');
        if (slider) {
          const d = parseInt(slider.getAttribute("aria-valuemax"), 10);
          elapsed = parseInt(slider.getAttribute("aria-valuenow"), 10);
          if (d === duration) {
            dispatch("timeupdate");
          } else {
            duration = d;
            dispatch("loadeddata");
            // this will help with the audio only plugin
            window.dispatchEvent("mediahaschanged");
          }
        }
      }, 500);
    }
  }

  function handlePause(e) {
    dispatch("pause");
    if (dodgyTimeUpdateInterval) {
      clearInterval(dodgyTimeUpdateInterval);
      dodgyTimeUpdateInterval = 0;
    }
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
        elapsed,
        duration
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
