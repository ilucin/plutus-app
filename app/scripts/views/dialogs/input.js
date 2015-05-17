define(['jquery', 'underscore', 'marionette', 'promise',
  'helpers/template',
  'behaviors/dialog'
], function($, _, Marionette, Promise,
  template,
  DialogBehavior
) {
  'use strict';

  var InputDialogView = Marionette.ItemView.extend({
    template: template('dialogs/input'),
    className: 'dialog-input',
    events: {
      'click .__button': 'onButtonClick'
    },
    ui: {
      $input: '.__input input'
    },
    behaviors: {
      Dialog: {}
    },

    serializeData: function() {
      return this.data;
    },

    onButtonClick: function() {
      this.trigger('value', this.ui.$input.val());
    },

    onRender: function() {
      var self = this;
      setTimeout(function() {
        self.ui.$input.focus();
      }, 0);
    },

    show: function(title, buttonText, value, inputType, placeholder) {
      var self = this;
      this.data = {
        title: title || 'Type something',
        button: buttonText || 'ok',
        placeholder: placeholder || 'name',
        value: value || '',
        inputType: inputType || 'text'
      };

      return new Promise(function(resolve, reject) {
        self.render();
        self.on('value', resolve);
        self.on('destroy', reject);
      });
    }
  });

  InputDialogView.show = DialogBehavior.show(InputDialogView);

  return InputDialogView;
});
