(function() {
	if (window.audioonly === "loaded") return;
	window.audioonly = "loaded";
	console.log("loading audioonly");

	// this doesn't actually work
	function forceAudioOnly(text) {
		return text.replace(/MUSIC_VIDEO_TYPE_OMV/g, "MUSIC_VIDEO_TYPE_ATV");
	}

	if (window.fetch && window.fetch.addInterceptor) {
		window.fetch.addInterceptor(forceAudioOnly);
	}

})();
