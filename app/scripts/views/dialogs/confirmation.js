define(['jquery', 'underscore', 'marionette', 'promise',
  'helpers/template',
  'behaviors/dialog'
], function($, _, Marionette, Promise,
  template,
  DialogBehavior
) {
  'use strict';

  var ConfirmationDialogView = Marionette.ItemView.extend({
    template: template('dialogs/confirmation'),
    className: 'dialog-confirmation',
    events: {
      'click .__button': 'onButtonClick'
    },
    behaviors: {
      Dialog: {}
    },

    initialize: function(message) {
      this.message = message;
    },

    serializeData: function() {
      return {
        message: this.message
      };
    },

    onButtonClick: function(ev) {
      this.trigger(ev.target.getAttribute('data-event'));
    },

    show: function(message) {
      var self = this;
      this.message = message;
      return new Promise(function(resolve, reject) {
        self.render();
        self.on('yes', resolve);
        self.on('no', reject);
      });
    }
  });

  ConfirmationDialogView.show = DialogBehavior.show(ConfirmationDialogView);

  return ConfirmationDialogView;
});
