'use strict';

var WatchEvents = require('./watch-events.js');
var ContentController = require('./content-controller.js');
var Sync = require('./sync.js');
var controller = new ContentController();

var sync = new Sync();
sync.start();

var events = new WatchEvents({
  onPlay: controller.onPlay.bind(controller),
  onPause: controller.onPause.bind(controller),
  onStop: controller.onStop.bind(controller)
});

events.startListeners();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'getCurrentItem') {
    sendResponse(controller.getCurrentItem());
  }
});