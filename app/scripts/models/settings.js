define(['underscore', 'backbone', 'services/storage'], function(_, Backbone, storage) {
  'use strict';

  var SettingsModel = Backbone.Model.extend({
    defaults: {
      currency: 'kn'
    },

    initialize: function() {
      var storedSettings = storage.getSettings();
      if (storedSettings) {
        this.set(storedSettings);
      }

      this.on('change', this.onChange, this);
    },

    onChange: function() {
      storage.saveSettings(this.toJSON());
    }
  });

  return SettingsModel;
});
