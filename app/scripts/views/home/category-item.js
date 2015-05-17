define(['marionette',
  'services/navigator',
  'helpers/template'
], function(Marionette,
  navigate,
  template
) {
  'use strict';

  var CategoryItemView = Marionette.ItemView.extend({
    template: template('home/category-item'),
    className: 'category-item',
    modelEvents: {
      'change': 'render'
    },
    events: {
      'click .__delete-button': 'onDeleteButtonClick'
    },

    onDeleteButtonClick: function() {
      navigate.toCategoryDelete(this.model.id);
    }
  });

  return CategoryItemView;
});
