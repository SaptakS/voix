// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
  // No tabs or host permissions needed!
chrome.tabs.onUpdated.addListener(
    window.onload = function(tabId, changeInfo, tab) {
      console.log('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
        file: 'jquery-1.11.3.js'
      });
      chrome.tabs.executeScript({
        file: 'content.js'
      });
});

chrome.tabs.onActivated.addListener(
    window.onload = function(activeInfo, tab) {
      console.log('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
        file: 'jquery-1.11.3.js'
      });
      chrome.tabs.executeScript({
        file: 'content.js'
      });
});

chrome.windows.onFocusChanged.addListener(
    window.onload = function(windowId, tab) {
      console.log('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
        file: 'jquery-1.11.3.js'
      });
      chrome.tabs.executeScript({
        file: 'content.js'
      });
});

chrome.tabs.onCreated.addListener(
    window.onload = function(tabId, tab) {
      console.log('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
        file: 'jquery-1.11.3.js'
      });
      chrome.tabs.executeScript({
        file: 'content.js'
      });
});
