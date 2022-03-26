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

  loop(pressKey, 60 * 1000, 10 * 1000);

  function pressKey() {
    const keyCodes = [18];
    let key = keyCodes[getRandomInt(0, keyCodes.length)];
    sendKeyEvent("keydown", key);
    sendKeyEvent("keyup", key);
  }

  function sendKeyEvent (aEvent, aKey) {
    document.dispatchEvent(new KeyboardEvent(aEvent, {
      bubbles: true,
      cancelable: true,
      keyCode: aKey,
      which: aKey,
    }));
  }

  function loop(aCallback, aDelay, aJitter) {
    let jitter = getRandomInt(-aJitter/2, aJitter/2);
    let delay = Math.max(aDelay + jitter, 0);

    window.setTimeout(() => {
      aCallback();
      loop(aCallback, aDelay, aJitter);
    }, delay);
  }

  function getRandomInt(aMin, aMax) {
    let min = Math.ceil(aMin);
    let max = Math.floor(aMax);
    return Math.floor(Math.random() * (max - min)) + min;
  }
})();
