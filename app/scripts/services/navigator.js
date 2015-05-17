define(function() {
  'use strict';

  var lastHash = null;
  var router;
  var DEBUG = false;

  function log() {
    if (DEBUG) {
      console.log.apply(console, arguments);
    }
  }

  window.addEventListener('hashchange', function(ev) {
    lastHash = ev.oldURL.split('#')[1];
  });

  var self = {
    init: function(inRouter) {
      router = inRouter;
    },

    toIndex: function() {
      self.navigate('/');
    },

    toLogin: function() {
      self.navigate('login');
    },

    toHome: function() {
      self.navigate('home');
    },

    toAbout: function() {
      self.navigate('about');
    },

    toMenu: function() {
      self.navigate('home/menu');
    },

    toTransactionAddExpense: function() {
      self.navigate('home/transaction/add/expense');
    },

    toTransactionAddIncome: function() {
      self.navigate('home/transaction/add/income');
    },

    toTransactionEdit: function(accountId, transactionId) {
      self.navigate('home/accounts/' + accountId + '/transactions/' + transactionId + '/edit');
    },

    toAccountsAdd: function() {
      self.navigate('home/accounts/add');
    },

    toAccountCorrection: function(accountId) {
      self.navigate('home/accounts/' + accountId + '/correction');
    },

    toAccountEdit: function(accountId) {
      self.navigate('home/accounts/' + accountId + '/edit');
    },

    toAccountDelete: function(accountId) {
      self.navigate('home/accounts/' + accountId + '/delete');
    },

    toAccountTransactions: function(accountId) {
      self.navigate('home/accounts/' + accountId + '/transactions');
    },

    toCategoriesAdd: function() {
      self.navigate('home/categories/add');
    },

    to: function(r) {
      self.navigate(r);
    },

    navigate: function(route) {
      log('navigate to ' + route);
      router.navigate(route, true);
    },

    navigateSilently: function(route) {
      log('navigate silently to ' + route);
      router.navigate(route, false);
    },

    backSilently: function() {
      log('navigate back silently');
      router.navigate(lastHash, false);
    },

    back: function() {
      log('navigate back');
      window.history.back();
    }
  };

  return self;
});
