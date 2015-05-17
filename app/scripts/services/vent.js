define(['backbone.wreqr'], function(Wreqr) {
  'use strict';

  // var eventCount = {};
  var vent = window.vent = new Wreqr.EventAggregator();

  // vent.trigger = function(ev) {
  //   eventCount[ev] = ev in eventCount ? (eventCount[ev] + 1) : 1;
  //   console.log('vent - ' + ev + ' - ' + (this._events[ev] ? this._events[ev].length : '0') + ' - ' + eventCount[ev]);

  //   Wreqr.EventAggregator.prototype.trigger.apply(this, arguments);
  // };
  return vent;
});
