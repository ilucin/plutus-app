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
      'click .__about': 'onAboutClick'
    },
    ui: {
      $form: 'form'
    },

    serializeData: function() {
      return this.model.toJSON();
    },

    onButtonLoginClick: function() {
      var userData = _.reduce(this.ui.$form.serializeArray(), function(res, val) {
        res[val.name] = val.value;
        return res;
      }, {});

      this.model.login(userData).then(function() {
        nav.toHome();
      });
    },

    onAboutClick: function() {
      nav.toAbout();
    }
  });

  return LoginView;
});
