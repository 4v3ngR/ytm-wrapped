(function() {
  const { Plugins } = require('@capacitor/core');
  const { CapacitorMusicControls } = Plugins;

  let inAppBrowserRef = null;
  let createdMusicControls = false;

  function createMusicControls(data) {
    if (createdMusicControls) {
      CapacitorMusicControls.removeAllListeners();
      CapacitorMusicControls.destroy();
    }

    createdMusicControls = true;
    if (!data) data = {};
    const { title = '', image = '', playing = false } = data;

    CapacitorMusicControls.create({
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

    CapacitorMusicControls.addListener('controlsNotification', events);
  }

  function events(action) {
    const message = action.message;
    switch(message) {
      case 'music-controls-next':
      case 'music-controls-media-button-next':
        inAppBrowserRef.executeScript({code: "window.controls.next();"}, () => null);
        break;
      case 'music-controls-previous':
      case 'music-controls-media-button-previous':
        inAppBrowserRef.executeScript({code: "window.controls.prev();"}, () => null);
        break;
      case 'music-controls-pause':
      case 'music-controls-headset-unplugged':
        inAppBrowserRef.executeScript({code: "window.controls.pause();"}, () => null);
        break;
      case 'music-controls-play':
      case 'music-controls-headset-plugged':
        inAppBrowserRef.executeScript({code: "window.controls.play();"}, () => null);
        break;
      case 'music-controls-toggle-play-pause':
      case 'music-controls-media-button-play-pause':
        inAppBrowserRef.executeScript({code: "window.controls.playpause();"}, () => null);
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
          CapacitorMusicControls.updateIsPlaying({ isPlaying: true });
          break;
        case "pause":
          CapacitorMusicControls.updateIsPlaying({ isPlaying: false });
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
