define(['underscore', 'marionette',
  'behaviors/select',
  'helpers/template',
  'services/navigator'
], function(_, Marionette,
  SelectBehavior,
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
      'change .__mode-select select': 'onModeSelectChange',
      'click .__pin-checkbox input': 'onPinCheckboxClick'
    },
    ui: {
      $modeSelect: '.__mode-select select',
      $pinCheckboxInput: '.__pin-checkbox input'
    },
    behaviors: {
      Select: {}
    },

    onRender: function() {
      this.ui.$modeSelect.val(this.model.get('mode'));
    },

    setPin: function() {
      this.ui.$pinCheckboxInput.prop('checked', this.model.get('isPinEnabled'));
    },

    onModeSelectChange: function() {
      this.model.set('mode', this.ui.$modeSelect.val());
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
