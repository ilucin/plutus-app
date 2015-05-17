define(['underscore', 'marionette', 'helpers/template',
  'services/navigator',
  'views/home/account-overview-collection'
], function(_, Marionette, template,
  navigate,
  AccountOverviewCollectionView
) {
  'use strict';

  var OverviewView = Marionette.LayoutView.extend({
    template: template('home/overview'),
    className: 'overview',
    regions: {
      accountOverviewsRegion: '.__account-overviews'
    },
    modelEvents: {
      'change:balance': 'renderBalance'
    },
    events: {
      'click .__add-income-button': 'onAddIncomeClick',
      'click .__add-expense-button': 'onAddExpenseClick',
    },
    ui: {
      $totalBalanceVal: '.__total-balance .__balance .value'
    },

    initialize: function() {
      this.accountOverviewCollectionView = new AccountOverviewCollectionView({
        collection: this.model.get('accounts')
      });
    },

    onRender: function() {
      this.accountOverviewsRegion.show(this.accountOverviewCollectionView);
    },

    renderBalance: function() {
      this.ui.$totalBalanceVal.text(this.model.get('balance'));
    },

    onAddExpenseClick: function() {
      navigate.toTransactionAddExpense();
    },

    onAddIncomeClick: function() {
      navigate.toTransactionAddIncome();
    }
  });

  return OverviewView;
});
