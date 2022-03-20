(function() {
  if (window.xhrrequest === "loaded") return;
  window.xhrrequest = "loaded";

  console.log("loadding xmlhttprequest interceptor");

  XMLHttpRequest.interceptors = [];
  XMLHttpRequest.addXHRInterceptor = function(fn) {
    if (XMLHttpRequest.interceptors.includes(fn)) return;
    XMLHttpRequest.interceptors.push(fn);
  }

  XMLHttpRequest.removeXHRInterceptor = function(fn) {
    var pos = XMLHttpRequest.interceptors.indexOf(fn);
    if (pos > -1) XMLHttpRequest.interceptors.splice(pos, 1);
  }

  function intercept(url, text) {
    for (var i = 0; i < XMLHttpRequest.interceptors.length; i++) {
      text = XMLHttpRequest.interceptors[i](url, text);
    }
    return text;
  }

  // based off https://stackoverflow.com/questions/16959359/intercept-xmlhttprequest-and-modify-responsetext
  var rawOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function(method, url, _async, username, password) {
    if (!this._hooked) {
      this._hooked = true;
      setupHook(this);
    }
    rawOpen.apply(this, arguments);
  }

  function setupHook(xhr) {
    function getter() {
      delete xhr.response;
      var ret = xhr.response;
      setup();
      return intercept(xhr.responseURL, ret);
    }

    function setter(str) {
    }

    function getterText() {
      delete xhr.responseText;
      var ret = xhr.responseText;
      setup();
      return ret;
    }

    function setterText(str) {
    }

    function setup() {
      Object.defineProperty(xhr, 'responseText', {
        get: getterText,
        set: setterText,
        configurable: true
      });
      Object.defineProperty(xhr, 'response', {
        get: getter,
        set: setter,
        configurable: true
      });
    }
    setup();
  }

})();
