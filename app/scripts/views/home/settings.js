define(['underscore', 'marionette', 'helpers/template'], function(_, Marionette, template) {
  'use strict';

  var SettingsView = Marionette.LayoutView.extend({
    template: template('home/settings'),
    className: 'home-settings',
    modelEvents: {
      'change': 'render'
    }
  });

  return SettingsView;
});
