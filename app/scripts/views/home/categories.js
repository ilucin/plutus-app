define(['underscore', 'marionette', 'helpers/template',
  'views/home/category-collection',
  'services/navigator'
], function(_, Marionette, template,
  CategoryCollection,
  navigate
) {
  'use strict';

  var CategoriesHomeView = Marionette.LayoutView.extend({
    template: template('home/categories'),
    className: 'home-categories',
    regions: {
      expensesRegion: '.__expenses',
      incomesRegion: '.__incomes'
    },
    events: {
      'click .__add-category-button': 'onAddCategoryButtonClick'
    },

    initialize: function() {
      this.expensesCollectionView = new CategoryCollection({
        collection: this.model.get('categories')
      });
      this.expensesCollectionView.filter = function(child) {
        return child.get('type') === 'expense';
      };
      this.incomesCollectionView = new CategoryCollection({
        collection: this.model.get('categories')
      });
      this.incomesCollectionView.filter = function(child) {
        return child.get('type') === 'income';
      };
    },

    onRender: function() {
      this.expensesRegion.show(this.expensesCollectionView);
      this.incomesRegion.show(this.incomesCollectionView);
    },

    onAddCategoryButtonClick: function() {
      navigate.toCategoriesAdd();
    }
  });

  return CategoriesHomeView;
});
