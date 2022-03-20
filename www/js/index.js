/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var plugins = {
    "fetch.js": null,
    "xmlhttprequest.js": null,
    "background.js": null,
    "adblock.js": null,
    "audioonly.js": null,
    "ui.js": null
};

var inAppBrowserRef;

async function loadPlugin(plugin) {
    console.log("loadPlugin for " + plugin);
    let x = await fetch(`https://localhost/js/plugins/${plugin}`);
    let script = await x.text();
    plugins[plugin] = script;
}

function injectPlugin(plugin) {
    let script = plugins[plugin];
    if (script) {
        inAppBrowserRef.executeScript({code: script}, scriptCallback);
    }
}

async function onDeviceReady() {
    document.getElementById('deviceready').classList.add('ready');
    var keys = Object.keys(plugins);
    for (var i = 0; i < keys.length; i++) {
        await loadPlugin(keys[i]);
    }

    inAppBrowserRef = cordova.InAppBrowser.open('https://music.youtube.com', '_blank', 'location=no,hidden=true,hardwareback=yes');
    inAppBrowserRef.addEventListener('loadstop', function() {
        inAppBrowserRef.insertCSS({code:"body{background-color:black;}"});
        inAppBrowserRef.show();
        try {
            console.log("going to inject plugins");
            Object.keys(plugins).forEach((plugin) => injectPlugin(plugin));
        } catch (ex) {
            console.error("got ex", ex.message);
        }
    });
    inAppBrowserRef.addEventListener('exit', function() {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            window.close();
        }
    });
}

function scriptCallback(e) {
    console.log("scriptCallback called");
    console.log(e);
}
