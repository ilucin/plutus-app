define(['underscore', 'marionette', 'helpers/template'], function(_, Marionette, template) {
  'use strict';

  var AboutView = Marionette.ItemView.extend({
    template: template('about'),
    className: 'about'
  });

  return AboutView;
});
