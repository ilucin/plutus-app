define(['underscore', 'marionette',
  'helpers/template',
  'services/navigator'
], function(_, Marionette,
  template,
  nav
) {
  'use strict';

  var LoginView = Marionette.LayoutView.extend({
    template: template('login'),
    className: 'login',
    events: {
      'click .__button-login': 'onButtonLoginClick',
      'click .__button-logout': 'onButtonLogoutClick',
      'click .__about': 'onAboutClick'
    },
    ui: {
      $form: 'form'
    },

    initialize: function(opts) {
      this.settingsModel = opts.settings;
      this.mode = opts.mode;
    },

    serializeData: function() {
      var d = this.model.toJSON();
      d.loginMode = this.mode === 'login';
      return d;
    },

    onButtonLoginClick: function() {
      if (this.mode === 'login') {
        var userData = _.reduce(this.ui.$form.serializeArray(), function(res, val) {
          res[val.name] = val.value;
          return res;
        }, {});

        this.model.login(userData).then(function() {
          nav.toHome();
        });
      } else if (this.mode === 'pin') {
        if (this.settingsModel.isValidPin(this.$('.__input-password input').val())) {
          nav.toHome();
        }
      }
    },

    onAboutClick: function() {
      nav.toAbout();
    },

    onButtonLogoutClick: function() {
      nav.toLogout();
    }
  });

  return LoginView;
});
