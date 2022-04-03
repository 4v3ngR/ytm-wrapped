(function() {
  if (!window.configInterval) {
    window.configInterval = setInterval(function() {
      try {
        window.yt.config_.IS_SUBSCRIBER = true;
        window.yt.config_.AUDIO_QUALITY = "AUDIO_QUALITY_HIGH";
        clearInterval(window.configInterval);
        window.configInterval = null;
      } catch (ex) {}
    }, 100);
  }
})();
