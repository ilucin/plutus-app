define(['underscore', 'marionette', 'helpers/template',
  'views/home/account-collection',
  'services/navigator'
], function(_, Marionette, template,
  AccountCollection,
  navigate
) {
  'use strict';

  var AccountsView = Marionette.LayoutView.extend({
    template: template('home/accounts'),
    className: 'home-accounts',
    regions: {
      accountsRegion: '.__accounts'
    },
    events: {
      'click .__add-account-button': 'onAddAccountButtonClick'
    },

    initialize: function() {
      this.accountOverviewCollectionView = new AccountCollection({
        collection: this.model.get('accounts')
      });
    },

    onRender: function() {
      this.accountsRegion.show(this.accountOverviewCollectionView);
    },

    onAddAccountButtonClick: function() {
      navigate.toAccountsAdd();
    }
  });

  return AccountsView;
});
