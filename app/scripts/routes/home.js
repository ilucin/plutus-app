define(['underscore',
  'views/home',
  'views/home/overview',
  'views/home/accounts',
  'views/home/categories',
  'views/home/settings',
  'views/home/transactions',
  'views/dialogs/input',
  'views/dialogs/confirmation',
  'views/dialogs/transaction',
  'services/data',
  'services/navigator',
  'models/account'
], function(_,
  HomeView,
  OverviewView,
  AccountsView,
  CategoriesView,
  SettingsView,
  TransactionsView,
  InputDialogView,
  ConfirmationDialogView,
  TransactionDialogView,
  data,
  navigate,
  AccountModel
) {
  'use strict';

  var homeView, dialogView;

  function showHomeContentView() {
    closeDialog(true);
    if (!homeView) {
      homeView = new HomeView();
    }
    homeView.closeMenuBar();
    homeView.showContentView.apply(homeView, arguments);
  }

  function closeDialog(shouldBeOffed) {
    if (dialogView) {
      if (shouldBeOffed === true) {
        dialogView.off();
      }
      dialogView.destroy();
      dialogView = null;
    }
  }

  function openDialog(dialog) {
    closeDialog();
    dialogView = dialog;
    dialog.on('dialog-destroy', navigate.back);
  }

  var HomeSubrouter = {
    routeNamespace: 'home',
    routes: {
      '': 'onHome',
      'overview': 'onOverview',
      'accounts': 'onAccounts',
      'accounts/add': 'onAccountsAdd',
      'transaction/add/income': 'onTransactionAddIncome',
      'transaction/add/expense': 'onTransactionAddExpense',
      'accounts/:accountId/correction': 'onAccountCorrection',
      'accounts/:accountId/delete': 'onAccountDelete',
      'accounts/:accountId/edit': 'onAccountEdit',
      'accounts/:accountId/transactions': 'onAccountTransactions',
      'accounts/:accountId/transactions/:transactionId/edit': 'onTransactionEdit',
      'categories': 'onCategories',
      'categories/:categoryId/delete': 'onCategoryDelete',
      'categories/add': 'onCategoriesAdd',
      'settings': 'onSettings',
      'set-pin': 'onSetPin',
      'clear-pin': 'onClearPin',
      'check-pin': 'onCheckPin',
      'menu': 'onMenu'
    },

    getView: function() {
      if (!homeView) {
        homeView = new HomeView();
      }
      return homeView;
    },

    goToOverview: function() {
      this.navigate('home/overview', {
        trigger: true,
        replace: true
      });
    },

    onCheckPin: function() {
      var self = this;
      openDialog(new InputDialogView());

      dialogView.show(null, 'enter', '', 'password', 'PIN').then(function(pin) {
        if (data.settings.isValidPin(pin)) {
          HomeSubrouter.goToOverview.call(self);
        }
        closeDialog();
      }, closeDialog);
    },

    onHome: function() {
      if (data.settings.get('isPinEnabled')) {
        navigate.toCheckPin();
      } else {
        HomeSubrouter.goToOverview.call(this);
      }
    },

    onMenu: function() {
      homeView.openMenuBar();
      return ['back', 'plutus'];
    },

    onAccounts: function() {
      showHomeContentView(AccountsView, {
        model: data.user
      });

      return ['back', 'Accounts'];
    },

    onAccountsAdd: function() {
      openDialog(new InputDialogView());
      dialogView.show('Add account').then(function(name) {
        var accountModel = new AccountModel({
          name: name
        });
        data.user.addAccount(accountModel).then(closeDialog, closeDialog);
      }, closeDialog);
    },

    onAccountCorrection: function(accountId) {
      var accountModel = data.user.getAccount(accountId);
      if (!accountModel) {
        return console.warn('Could not find account.');
      }

      openDialog(new InputDialogView());
      dialogView.show('Update "' + accountModel.get('name') + '" balance', 'Save', accountModel.get('balance'), 'number', 'Balance').then(function(val) {
        accountModel.saveCorrection(data.user.id, val).then(closeDialog, closeDialog);
      }, closeDialog);
    },

    onAccountDelete: function(accountId) {
      var accountModel = data.user.getAccount(accountId);
      if (!accountModel) {
        navigate.back();
        return console.warn('Could not find account to delete.');
      }

      openDialog(new ConfirmationDialogView());
      dialogView.show('Are you sure you want to delete account "' + accountModel.get('name') + '"?').then(function() {
        data.user.deleteAccount(accountModel).then(closeDialog, closeDialog);
      }, closeDialog);
    },

    onAccountEdit: function(accountId) {
      var accountModel = data.user.getAccount(accountId);
      if (!accountModel) {
        navigate.back();
        return console.warn('Could not find account.');
      }

      openDialog(new InputDialogView());
      dialogView.show('Edit account', 'Save', accountModel.get('name'), 'text', 'Account name').then(function(val) {
        accountModel.update(val).then(closeDialog, closeDialog);
      }, closeDialog);
    },

    onCategories: function() {
      showHomeContentView(CategoriesView, {
        model: data.user
      });
      return ['back', 'Categories'];
    },

    onCategoriesAdd: function() {
      openDialog(new InputDialogView());
      dialogView.show('add category').then(function(name) {
        data.user.addCategory(name).then(closeDialog, closeDialog);
      }, closeDialog);
    },

    onTransactionAddExpense: function() {
      HomeSubrouter.onTransactionAdd('expense');
    },

    onTransactionAddIncome: function() {
      HomeSubrouter.onTransactionAdd('income');
    },

    onTransactionAdd: function(type) {
      openDialog(new TransactionDialogView({
        accounts: data.user.get('accounts')
      }));
      dialogView.show('add', type).then(function(transactionModel) {
        var accountModel = data.user.getAccount(transactionModel.get('account'));
        if (!accountModel) {
          navigate.back();
          return console.warn('Could not find account.');
        }

        transactionModel.save(data.user.id, accountModel.id).then(function(response) {
          accountModel.set(response.account);
          closeDialog();
        }, closeDialog);
      }, closeDialog);
    },

    onTransactionEdit: function(accountId, transactionId) {
      var accountModel = data.user.getAccount(accountId);
      if (!accountModel) {
        navigate.back();
        return console.warn('Could not find account.');
      }

      var transactionModel = accountModel.transactions.get(transactionId);
      if (!transactionModel) {
        navigate.back();
        return console.warn('Could not find transaction.');
      }

      openDialog(new TransactionDialogView({
        accounts: data.user.get('accounts'),
        model: transactionModel
      }));
      dialogView.show('edit').then(function(transactionModel) {
        transactionModel.save(data.user.id, accountModel.id).then(function(response) {
          accountModel.set(response.account);
          closeDialog();
        }, closeDialog);
      }, closeDialog);
    },

    onCategoryDelete: function(categoryId) {},

    onAccountTransactions: function(accountId) {
      var accountModel = data.user.getAccount(accountId);
      if (!accountModel) {
        navigate.back();
        return console.warn('Could not find account.');
      }

      return accountModel.updateTransactions().then(function() {
        showHomeContentView(TransactionsView, {
          model: accountModel
        });

        return ['back', 'plutus'];
      }, navigate.back);
    },

    onSettings: function() {
      showHomeContentView(SettingsView, {
        model: data.settings
      });

      return ['back', 'Settings'];
    },

    onClearPin: function() {
      openDialog(new InputDialogView());

      dialogView.show('PIN', 'disable pin', '', 'password', 'Current PIN').then(function(pin) {
        if (data.settings.isValidPin(pin)) {
          data.settings.set({
            pin: null,
            isPinEnabled: false
          });
        }
        closeDialog();
      }, closeDialog);
    },

    onSetPin: function() {
      openDialog(new InputDialogView());

      function onError() {
        data.settings.set('isPinEnabled', false);
        closeDialog();
      }

      function setNewPin() {
        dialogView.show('Set new PIN').then(function(pin) {
          data.settings.setPin(pin);
          data.settings.set('isPinEnabled', true);
          closeDialog();
        }, onError);
      }

      if (data.settings.get('pin')) {
        dialogView.show('PIN', 'ok', '', 'password', 'Current PIN').then(function(pin) {
          if (data.settings.isValidPin(pin)) {
            setNewPin();
          } else {
            onError();
          }
        }, onError);
      } else {
        setNewPin();
      }
    },

    onOverview: function() {
      showHomeContentView(OverviewView, {
        model: data.user
      });
      // setTimeout(function() {
      //   navigate.toTransactionAddIncome();
      // }, 200);
      return ['menu', 'plutus'];
    }
  };

  return HomeSubrouter;
});
