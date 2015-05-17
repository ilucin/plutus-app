define(['underscore', 'backbone', 'models/category'], function(_, Backbone, CategoryModel) {
  'use strict';

  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel
  });

  return CategoryCollection;
});
