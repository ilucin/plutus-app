define(['marionette', 'views/home/category-item'], function(Marionette, CategoryItemView) {
  'use strict';

  var CategoryEmptyView = Marionette.ItemView.extend({
    className: 'category-overview-empty empty-view',
    template: function() {
      return 'You have no categories. Create em!';
    }
  });

  var CategoryCollectionView = Marionette.CollectionView.extend({
    className: 'category-collection',
    childView: CategoryItemView,
    emptyView: CategoryEmptyView
  });

  return CategoryCollectionView;
});
