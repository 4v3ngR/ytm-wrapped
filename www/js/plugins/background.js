// original code from "Video Background Play Fix" a Firefox extension
// By JanH (https://addons.mozilla.org/en-US/firefox/user/11797710)
// Thanks for releasing it MIT

(function() {
  Object.defineProperties(document,
    {
      'hidden': {value: false},
      'webkitHidden': {value: false},
      'visibilityState': {value: 'visible'},
      'webkitVisibilityState': {value: 'visible'},
    }
  );

  window.addEventListener('visibilitychange', evt => {
    evt.stopImmediatePropagation();
    return false;
  }, true);

  window.addEventListener('webkitvisibilitychange', evt => {
    evt.stopImmediatePropagation();
    return false;
  }, true);

  var video = null;
  var player = document.querySelector('ytmusic-player');
  if (player) {
    video = player.querySelector('video');
    if (video) {
      if (!video.dontStopTheMusic) {
        video.dontStopTheMusic = true;
        video.addEventListener('timeupdate', () => {
          const { duration, currentTime } = video;
          if (duration && currentTime + 1 >= duration) {
            const button = document.querySelector("tp-yt-paper-icon-button.next-button");
            if (button) button.click();
          }
        });
      }
    }
  }
})();
