define(['underscore', 'backbone', 'models/account'], function(_, Backbone, AccountModel) {
  'use strict';

  var AccountCollection = Backbone.Collection.extend({
    model: AccountModel
  });

  return AccountCollection;
});
