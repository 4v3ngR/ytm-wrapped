(function() {
  if (window.audioonly === "loaded") return;
  window.audioonly = "loaded";
  console.log("loading audioonly");

  function forceAudioOnly(state, url, data) {
    if (url.includes('youtubei/v1/player') && state === 'response') try {
      var obj = JSON.parse(data);
      if (obj.videoDetails) {
        obj.videoDetails.musicVideoType = "MUSIC_VIDEO_TYPE_ATV";
        data = JSON.stringify(obj);
      }
      return data;
    } catch (ex) {}
    return data;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(forceAudioOnly);
  }
})();
