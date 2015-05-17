define(['jquery', 'underscore', 'marionette', 'promise',
  'services/data',
  'services/navigator',
  'helpers/template'
], function($, _, Marionette, Lie,
  data,
  navigate,
  template
) {
  'use strict';

  var AccountOverviewItemView = Marionette.ItemView.extend({
    template: template('home/account-overview-item'),
    className: 'account-overview-item touchable',
    modelEvents: {
      'change': 'render'
    },
    events: {
      'click .__correction-button': 'onCorrectionButtonClick',
      'click': 'onClick'
    },

    onCorrectionButtonClick: function(ev) {
      ev.stopImmediatePropagation();
      navigate.toAccountCorrection(this.model.id);
    },

    onClick: function() {
      navigate.toAccountTransactions(this.model.id);
    }
  });

  return AccountOverviewItemView;
});
