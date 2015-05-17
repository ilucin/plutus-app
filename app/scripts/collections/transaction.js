define(['underscore', 'backbone',
  'models/transaction',
  'services/api'
], function(_, Backbone,
  TransactionModel,
  api
) {
  'use strict';

  var TransactionCollection = Backbone.Collection.extend({
    model: TransactionModel,

    fetch: function(userId, accountId) {
      var self = this;
      return api.getTransactions(userId, accountId).then(function(transactions) {
        self.set(transactions);
        return transactions;
      });
    },

    comparator: function(i1, i2) {
      return i1.get('createdAt') < i2.get('createdAt') ? 1 : -1;
    }
  });

  return TransactionCollection;
});
