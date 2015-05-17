define(['underscore', 'jquery', 'promise',
  'backbone',
  'backbone.associations',
  'collections/account',
  'collections/category',
  'models/account',
  'models/category',
  'services/api',
  'services/storage'
], function(_, $, Promise,
  Backbone,
  BackboneAssociations,
  AccountCollection,
  CategoryCollection,
  AccountModel,
  CategoryModel,
  api,
  storage
) {
  'use strict';

  var UserModel = Backbone.AssociatedModel.extend({
    idAttribute: '_id',
    relations: [{
      type: Backbone.Many,
      key: 'accounts',
      collectionType: AccountCollection,
      relatedModel: AccountModel
    }, {
      type: Backbone.Many,
      key: 'categories',
      collectionType: CategoryCollection,
      relatedModel: CategoryModel
    }],
    defaults: {
      email: 'lucin.ivan@gmail.com',
      password: '',
      balance: 0,
      accounts: []
    },

    initialize: function() {
      var storedUser = storage.getUser();

      if (storedUser) {
        this.set(storedUser);
      }

      this.on('change', this.onChange, this);
      this.on('add:accounts remove:accounts', this.onAccountsAddOrRemove, this);
      this.on('change:accounts[*].balance', this.updateBalance, this);

      this.updateBalance();
      this.updateAuthSetup();
    },

    // trigger: function(a) {
    //   console.log('trigger', a);
    //   Backbone.Model.prototype.trigger.apply(this, arguments);
    // },

    onChange: function() {
      storage.saveUser(this.toJSON());
    },

    updateBalance: function() {
      this.set('balance', this.get('accounts').reduce(function(sum, accountModel) {
        return sum + accountModel.get('balance');
      }, 0));
    },

    onAccountsAddOrRemove: function() {
      this.updateBalance();
      this.onChange();
    },

    updateAuthSetup: function() {
      api.setupAuth(this.get('email'), this.get('authToken'));
    },

    login: function(loginData) {
      var self = this;

      if (!loginData.email || !loginData.password) {
        return Promise.reject('Validation error');
      }

      return api.login(loginData).then(function(data) {
        self.set(data);
        self.updateAuthSetup();
      });
    },

    isLoggedIn: function() {
      return !!this.get('authToken');
    },

    getAccount: function(id) {
      return this.get('accounts').get(id);
    },

    addAccount: function(accountModel) {
      var self = this;
      return api.addAccount(this.id, accountModel.toJSON()).then(function(account) {
        self.get('accounts').add(account);
        return account;
      });
    },

    deleteAccount: function(account) {
      var self = this;
      return api.deleteAccount(this.id, account.id).then(function() {
        self.get('accounts').remove(account);
        return Promise.resolve();
      });
    },

    addCategory: function(name) {
      var self = this;
      self.get('categories').add({
        _id: Date.now(),
        name: name
      });
      return Promise.resolve();
    }
  });

  return UserModel;
});
