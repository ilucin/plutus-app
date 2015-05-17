define(['marionette', 'views/home/account-item'], function(Marionette, AccountItemView) {
  'use strict';

  var AccountEmptyView = Marionette.ItemView.extend({
    className: 'account-empty empty-view',
    template: function() {
      return 'You have no accounts. Create em!';
    }
  });

  var AccountCollectionView = Marionette.CollectionView.extend({
    className: 'account-collection',
    childView: AccountItemView,
    emptyView: AccountEmptyView
  });

  return AccountCollectionView;
});
