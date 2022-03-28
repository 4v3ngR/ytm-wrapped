(function() {
  let inAppBrowserRef = null;
  let createdMusicControls = false;

  function createMusicControls(data) {
    MusicControls = MusicControls;
    createdMusicControls = true;
    if (!data) data = {};
    const { title = '', image = '', playing = false } = data;

    MusicControls.create({
      track: title ? title : '',
      cover: image ? image : '',
      album: '',
      artist: '',
      ticker: '',
      hasPrev: true,
      hasNext: true,
      hasClose: false,
      isPlaying: playing,
      dismissable: true,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    }, () => null, () => null);

    MusicControls.subscribe(action => events(JSON.parse(action)));
    MusicControls.listen();
  }

  function events(action) {
    const message = action.message;
    switch(message) {
      case 'music-controls-next':
        inAppBrowserRef.executeScript({code: "window.controls.next();"}, () => null);
        break;
      case 'music-controls-previous':
        inAppBrowserRef.executeScript({code: "window.controls.prev();"}, () => null);
        break;
      case 'music-controls-pause':
        inAppBrowserRef.executeScript({code: "window.controls.pause();"}, () => null);
        break;
      case 'music-controls-play':
        inAppBrowserRef.executeScript({code: "window.controls.play();"}, () => null);
        break;
      case 'music-controls-toggle-play-pause' :
        inAppBrowserRef.executeScript({code: "window.controls.playpause();"}, () => null);
        break;
      case 'music-controls-headset-unplugged':
        inAppBrowserRef.executeScript({code: "window.controls.pause();"}, () => null);
        break;
      case 'music-controls-headset-plugged':
        inAppBrowserRef.executeScript({code: "window.controls.play();"}, () => null);
        break;
      default:
        break;
    }
  }

  function handleIABMessage(e) {
    let obj = e.data;
    if (obj.message) {
      if (!createdMusicControls) createMusicControls(obj);
      switch (obj.message) {
        case "play":
          MusicControls.updateIsPlaying(true);
          break;
        case "pause":
          MusicControls.updateIsPlaying(false);
          break;
      }
    }
  }

  exports = module.exports = {
    init: (ref) => {
      inAppBrowserRef = ref;
      ref.addEventListener("message", handleIABMessage);
    }
  };
})();
