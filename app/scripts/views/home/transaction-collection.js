define(['marionette', 'views/home/transaction-item'], function(Marionette, TransactionItemView) {
  'use strict';

  var TransactionEmptyView = Marionette.ItemView.extend({
    className: 'transaction-empty empty-view',
    template: function() {
      return 'You have no transactions. Create em!';
    }
  });

  var TransactionCollectionView = Marionette.CollectionView.extend({
    className: 'transaction-collection',
    childView: TransactionItemView,
    emptyView: TransactionEmptyView
  });

  return TransactionCollectionView;
});
