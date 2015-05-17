define(['underscore', 'backbone', 'promise',
  'collections/transaction',
  'services/api',
  'helpers/money'
], function(_, Backbone, Promise,
  TransactionCollection,
  api,
  money
) {
  'use strict';

  var AccountModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      name: '',
      balance: 0
    },

    initialize: function() {
      this.transactions = new TransactionCollection();
      this.on('change:balance', this.resetFetchTransactionsFlag, this);
      this.resetFetchTransactionsFlag();
    },

    set: function(arg1, arg2) {
      if (arg2 && arg1 === 'balance') {
        arg2 = money.parse(arg2);
      } else if (arg2 === undefined && arg1 && arg1.balance) {
        arg1.balance = money.parse(arg1.balance);
      }

      Backbone.Model.prototype.set.call(this, arg1, arg2);
    },

    saveCorrection: function(userId, val) {
      var self = this;
      val = money.parse(val);
      if (isNaN(val)) {
        return Promise.reject('Invalid value');
      }

      return api.accountBalanceCorrection(userId, this.id, val).then(function(data) {
        self.set(data.account);
        return data;
      });
    },

    resetFetchTransactionsFlag: function() {
      this._transactionsFetched = false;
    },

    update: function(name) {
      this.set('name', name);
      return api.updateAccount(this.get('user'), this.id, this.toJSON());
    },

    updateTransactions: function() {
      if (!this._transactionsFetched) {
        return this.fetchTransactions();
      } else {
        return Promise.resolve();
      }
    },

    fetchTransactions: function() {
      var self = this;
      return this.transactions.fetch(this.get('user'), this.id).then(function(data) {
        self._transactionsFetched = true;
        return data;
      });
    }
  });
  return AccountModel;
});
