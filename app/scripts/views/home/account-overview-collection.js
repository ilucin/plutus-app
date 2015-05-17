define(['marionette', 'views/home/account-overview-item'], function(Marionette, AccountOverviewItemView) {
  'use strict';

  var AccountOverviewEmptyView = Marionette.ItemView.extend({
    className: 'account-overview-empty empty-view',
    template: function() {
      return 'You have no accounts. Create em!';
    }
  });

  var AccountOverviewCollectionView = Marionette.CollectionView.extend({
    className: 'account-overview-collection',
    childView: AccountOverviewItemView,
    emptyView: AccountOverviewEmptyView
  });

  return AccountOverviewCollectionView;
});
