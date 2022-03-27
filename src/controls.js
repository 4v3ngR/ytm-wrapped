(function() {

  var createdMusicControls = false;
  function createMusicControls(data) {
    createdMusicControls = true;
    MusicControls.create({
      track       : data ? data.title : '',
      cover       : data ? data.image : '',
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    }, () => null, () => null);

    // Register callback
    MusicControls.subscribe(events);

    // Start listening for events
    // The plugin will run the events function each time an event is fired
    MusicControls.listen();
  }

  function events(action) {

    const message = JSON.parse(action).message;
    switch(message) {
      case 'music-controls-next':
        window.inAppBrowserRef.executeScript({code: "window.controls.next();"}, () => null);
        // Do something
        break;
      case 'music-controls-previous':
        window.inAppBrowserRef.executeScript({code: "window.controls.prev();"}, () => null);
        // Do something
        break;
      case 'music-controls-pause':
        window.inAppBrowserRef.executeScript({code: "window.controls.pause();"}, () => null);
        // Do something
        break;
      case 'music-controls-play':
        window.inAppBrowserRef.executeScript({code: "window.controls.play();"}, () => null);
        break;
      case 'music-controls-destroy':
        // Do something
        break;
      case 'music-controls-toggle-play-pause' :
        window.inAppBrowserRef.executeScript({code: "window.controls.playpause();"}, () => null);
        // Do something
        break;
        // Lockscreen seek controls (iOS only)
      case 'music-controls-seek-to':
        const seekToInSeconds = JSON.parse(action).position;
        MusicControls.updateElapsed({
          elapsed: seekToInSeconds,
          isPlaying: true
        });
        // Do something
        break;

        // Headset events (Android only)
        // All media button events are listed below
      case 'music-controls-media-button' :
        // Do something
        break;
      case 'music-controls-headset-unplugged':
        // Do something
        window.inAppBrowserRef.executeScript({code: "window.controls.pause();"}, () => null);
        break;
      case 'music-controls-headset-plugged':
        // Do something
        window.inAppBrowserRef.executeScript({code: "window.controls.play();"}, () => null);
        break;
      default:
        break;
    }
  }

  function handleIABMessage(e) {
    let obj = e.data;
    if (obj.message) {
      if (!createdMusicControls) createMusicControls();
      switch (obj.message) {
        case "play":
          MusicControls.updateIsPlaying(true);
          break;
        case "pause":
          MusicControls.updateIsPlaying(false);
          break;
        case "timeupdate":
          MusicControls.updateElapsed({
            elapsed: Math.floor(obj.offset),
            isPlaying: true
          });
          break
        case "loadeddata":
          if (createdMusicControls) MusicControls.destroy(() => null, () => null);
          createMusicControls(obj.message);
          break;
      }
    }
  }

  exports = module.exports = {
    init: (ref) => {
      ref.addEventListener("message", handleIABMessage);
    }
  };
})();
