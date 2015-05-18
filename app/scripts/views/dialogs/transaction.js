define(['jquery', 'underscore', 'marionette', 'promise',
  'models/transaction',
  'helpers/template',
  'behaviors/select',
  'behaviors/dialog',
], function($, _, Marionette, Promise,
  TransactionModel,
  template,
  SelectBehavior,
  DialogBehavior
) {
  'use strict';

  var TransactionDialogView = Marionette.ItemView.extend({
    template: template('dialogs/transaction'),
    className: 'dialog-transaction',
    events: {
      'click .__button-save': 'onButtonSaveClick'
    },
    ui: {
      $amountInput: '.__input-amount input',
      $accountSelect: '.__account-select select',
      $typeSelect: '.__type-select select',
      $descriptionInput: '.__input-description input'
    },
    behaviors: {
      Dialog: {},
      Select: {}
    },

    initialize: function(opts) {
      this.model = this.model || new TransactionModel();
      this.accounts = opts.accounts;
    },

    serializeData: function() {
      var data = this.model.toJSON();
      data.accounts = this.accounts.toJSON();
      data.mode = this.mode;
      data.title = this.mode === 'add' ? ('Add ' + data.type) : 'Edit transaction';
      data.selectColor = data.type === 'expense' ? 'red' : 'blue';
      return data;
    },

    onButtonSaveClick: function() {
      this.model.set({
        account: this.ui.$accountSelect.val(),
        amount: this.ui.$amountInput.val(),
        description: this.ui.$descriptionInput.val(),
        type: this.ui.$typeSelect.val()
      });
      this.trigger('save', this.model);
    },

    onRender: function() {
      var self = this;
      this.$el.attr('data-mode', this.mode);
      this.$el.attr('data-type', this.model.get('type'));

      setTimeout(function() {
        self.ui.$typeSelect.val(self.model.get('type'));
        self.ui.$amountInput.focus();
      }, 0);
    },

    show: function(mode, type) {
      var self = this;
      this.mode = mode || 'add';

      if (type) {
        this.model.set({
          type: type
        });
      }

      return new Promise(function(resolve, reject) {
        self.render();
        self.on('save', resolve);
        self.on('dialog-destroy', reject);
      });
    }
  });

  TransactionDialogView.show = DialogBehavior.show(TransactionDialogView);

  return TransactionDialogView;
});
