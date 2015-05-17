define(['marionette',
  'helpers/template',
  'services/navigator',
  'behaviors/timeago'
], function(Marionette,
  template,
  navigate
) {
  'use strict';

  var TransactionItemView = Marionette.ItemView.extend({
    template: template('home/transaction-item'),
    className: 'transaction-item touchable',
    modelEvents: {
      'change': 'render'
    },
    events: {
      'click': 'onClick'
    },
    behaviors: {
      Timeago: {}
    },

    onRender: function() {
      this.$el.attr('data-type', this.model.get('type'));
    },

    onClick: function() {
      navigate.toTransactionEdit(this.model.get('account'), this.model.id);
    }
  });

  return TransactionItemView;
});
