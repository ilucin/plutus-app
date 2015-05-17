define(['marionette', 'helpers/template', 'services/navigator'], function(Marionette, template, navigate) {
  'use strict';

  var AccountItemView = Marionette.ItemView.extend({
    template: template('home/account-item'),
    className: 'account-item touchable',
    modelEvents: {
      'change': 'render'
    },
    events: {
      'click .__button-delete': 'onButtonDeleteClick',
      'click': 'onClick'
    },

    onButtonDeleteClick: function(ev) {
      ev.stopImmediatePropagation();
      navigate.toAccountDelete(this.model.id);
    },

    onClick: function() {
      navigate.toAccountEdit(this.model.id);
    }
  });

  return AccountItemView;
});
