define(['underscore', 'services/http'], function(_, http) {
  'use strict';

  function httpRequest(method, route, params, data) {
    return http.request({
      url: {
        route: route,
        params: params
      },
      method: method,
      data: data
    });
  }

  var api = {
    setupAuth: function(email, token) {
      $.ajaxSetup({
        headers: {
          'x-auth-email': email,
          'x-auth-token': token
        }
      });
    },

    login: function(data) {
      return httpRequest('POST', 'login', null, data);
    },

    addAccount: function(userId, data) {
      return httpRequest('POST', 'users/:userId/accounts', {
        userId: userId
      }, data);
    },

    updateAccount: function(userId, accountId, data) {
      return httpRequest('PUT', 'users/:userId/accounts/:accountId', {
        userId: userId,
        accountId: accountId
      }, data);
    },

    deleteAccount: function(userId, accountId) {
      return httpRequest('DELETE', 'users/:userId/accounts/:accountId', {
        userId: userId,
        accountId: accountId
      });
    },

    accountBalanceCorrection: function(userId, accountId, balance) {
      return httpRequest('POST', 'users/:userId/accounts/:accountId/correction', {
        userId: userId,
        accountId: accountId
      }, {
        balance: balance
      });
    },

    addTransaction: function(userId, accountId, data) {
      return httpRequest('POST', 'users/:userId/accounts/:accountId/transactions', {
        userId: userId,
        accountId: accountId
      }, data);
    },

    updateTransaction: function(userId, accountId, transactionId, data) {
      return httpRequest('PUT', 'users/:userId/accounts/:accountId/transaction/:transactionId', {
        userId: userId,
        accountId: accountId,
        transactionId: transactionId
      }, data);
    },

    getTransactions: function(userId, accountId) {
      return httpRequest('GET', 'users/:userId/accounts/:accountId/transactions', {
        userId: userId,
        accountId: accountId
      });
    }
  };

  return api;
});
