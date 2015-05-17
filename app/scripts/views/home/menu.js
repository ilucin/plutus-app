define(['underscore', 'marionette', 'helpers/template'], function(_, Marionette, template) {
  'use strict';

  var MenuView = Marionette.ItemView.extend({
    template: template('home/menu'),
    className: 'menu',
    events: {
      'click .item': 'onMenuItemClick'
    },

    initialize: function() {
      this.menuHeaderClickCounter = 0;
    },

    onMenuItemClick: function(ev) {
      this.trigger('menu:item', ev.target.getAttribute('data-menu-item'));
    }
  });

  return MenuView;
});
