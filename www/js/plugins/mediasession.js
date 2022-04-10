(function() {
  class MediaSession {
    constructor() {
      this.meta = null;
      this.state = "none";
      this.actionHandlers = {};
      this.position = 0;
      this.duration = 0;
    }

    get playbackState() {
      return this.state;
    }

    get positionState() {
      return {
        position: this.position,
        duration: this.duration,
        playbackRate: 1.0
      }
    }

    set positionState(dict) {
      console.log("setPositionState called", dict);
      if (dict) {
        this.position = dict.position;
        this.duration = dict.duration;
      }
    }

    set playbackState(newstate) {
      this.state = newstate;
    }

    setActionHandler = (type, callback) => {
      this.actionHandlers[type] = callback;
    }

    get metadata() {
      return this.meta;
    }

    set metadata(m) {
      this.meta = m;
      window.dispatchEvent(new Event("mediahaschanged"));
    }
  }

  class MediaMetadata {
    constructor(metadata) {
      this.metadata = metadata;
    }

    get title() {
      return this.metadata.title;
    }

    set title(t) {
      this.metadata.title = t;
    }

    get artist() {
      return this.metadata.artist;
    }

    set artist(a) {
      this.metadata.artist = a;
    }

    get album() {
      return this.metadata.album;
    }

    set album(a) {
      this.metadata.album = a;
    }

    get artwork() {
      return this.metadata.artwork;
    }

    set artwork(a) {
      this.metadata.artwork = a;
    }
  }

  if (!navigator.mediaSession) {
    navigator.mediaSession = new MediaSession();
  }

  window.MediaMetadata = MediaMetadata;
})();
