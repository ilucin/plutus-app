define(['underscore', 'marionette', 'helpers/template',
  'views/home/transaction-collection'
], function(_, Marionette, template,
  TransactionCollectionView
) {
  'use strict';

  var CategoriesHomeView = Marionette.LayoutView.extend({
    template: template('home/transactions'),
    className: 'home-transactions',
    regions: {
      transactionRegion: '.__transactions'
    },

    initialize: function() {
      this.transactionCollectionView = new TransactionCollectionView({
        collection: this.model.transactions
      });
    },

    onRender: function() {
      this.transactionRegion.show(this.transactionCollectionView);
    }
  });

  return CategoriesHomeView;
});
