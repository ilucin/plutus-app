define(['underscore', 'backbone',
  'helpers/helpers',
  'helpers/handlebars',
  'services/storage'
], function(_, Backbone,
  helpers,
  handlebarsHelpers,
  storage
) {
  'use strict';

  var SettingsModel = Backbone.Model.extend({
    defaults: {
      currency: 'kn',
      isPinEnabled: false,
      pin: '',
      mode: 'none',
      monthlyAmount: 1000
    },

    initialize: function() {
      var storedSettings = storage.getSettings();
      if (storedSettings) {
        this.set(storedSettings);
      }

      handlebarsHelpers.setCurrency(this.get('currency'));
      this.on('change', this.onChange, this);
    },

    onChange: function() {
      storage.saveSettings(this.toJSON());
      handlebarsHelpers.setCurrency(this.get('currency'));
    },

    isValidPin: function(pin) {
      return helpers.hash(pin) === this.get('pin');
    },

    setPin: function(val) {
      this.set('pin', helpers.hash(val));
    }
  });

  return SettingsModel;
});
