define(['jquery', 'underscore', 'marionette', 'promise',
  'helpers/template',
  'behaviors/dialog'
], function($, _, Marionette, Promise,
  template,
  DialogBehavior
) {
  'use strict';

  var MessageDialogView = Marionette.ItemView.extend({
    template: template('dialogs/message'),
    className: 'dialog-message',
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
    }
  });

  MessageDialogView.show = DialogBehavior.show(MessageDialogView);

  return MessageDialogView;
});
