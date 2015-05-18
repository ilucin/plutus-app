define(['underscore', 'marionette',
  'helpers/template',
  'services/navigator'
], function(_, Marionette,
  template,
  navigate
) {
  'use strict';

  var SettingsView = Marionette.LayoutView.extend({
    template: template('home/settings'),
    className: 'home-settings',
    modelEvents: {
      'change:isPinEnabled': 'setPin'
    },
    events: {
      'change .input input': 'setInputToModel',
      'click .__pin-checkbox input': 'onPinCheckboxClick'
    },
    ui: {
      $pinCheckboxInput: '.__pin-checkbox input'
    },

    setPin: function() {
      this.ui.$pinCheckboxInput.prop('checked', this.model.get('isPinEnabled'));
    },

    onPinCheckboxClick: function(ev) {
      ev.preventDefault();
      if (this.model.get('isPinEnabled')) {
        navigate.toClearPin();
      } else {
        navigate.toSetPin();
      }
    },

    setInputToModel: function(ev) {
      var inputEl = ev.target;
      var prop = inputEl.getAttribute('data-property');
      var type;

      if (prop) {
        type = inputEl.getAttribute('type');
        this.model.set(prop, type === 'checkbox' || type === 'radio' ? $(inputEl).is(':checked') : inputEl.value);
      }
    }
  });

  return SettingsView;
});
