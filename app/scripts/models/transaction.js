define(['underscore', 'backbone',
  'services/api',
  'helpers/money'
], function(_, Backbone,
  api,
  money
) {
  'use strict';

  var TransactionModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      amount: 1,
      description: '',
      type: 'expense'
    },

    set: function(arg1, arg2) {
      if (arg2 && arg1 === 'amount') {
        arg2 = money.parse(arg2);
      } else if (arg2 === undefined && arg1 && arg1.amount) {
        arg1.amount = money.parse(arg1.amount);
      }

      Backbone.Model.prototype.set.call(this, arg1, arg2);
    },

    save: function(userId, accountId) {
      var self = this;
      if (!this.get('_id')) {
        return api.addTransaction(userId, accountId, this.toJSON()).then(function(data) {
          self.set(data.transaction);
          return data;
        });
      } else {
        return api.updateTransaction(userId, accountId, this.id, this.toJSON()).then(function(data) {
          self.set(data.transaction);
          return data;
        });
      }
    }
  });

  return TransactionModel;
});
