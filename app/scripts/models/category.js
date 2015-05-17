define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';

  var CategoryModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      type: 'expense'
    }
  });

  return CategoryModel;
});
