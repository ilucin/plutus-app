define(['marionette'], function(Marionette) {
  'use strict';

  var behaviors = {};

  Marionette.Behaviors.behaviorsLookup = function() {
    return behaviors;
  };

  return {
    save: function(name, behavior) {
      behaviors[name] = behavior;
    },
    getAll: function() {
      return behaviors;
    }
  };
});
