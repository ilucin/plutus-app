/*global define*/
define(['underscore', 'marionette',
  'helpers/template',
  'services/navigator'
], function(_, Marionette,
  template,
  appNavigator
) {
  'use strict';

  var DialogView = Marionette.LayoutView.extend({
    template: template('dialog'),
    className: 'dialog',
    events: {
      'click .dialog__close': 'onCloseClick',
      'click': 'onDialogClick'
    },
    ui: {},
    regions: {
      viewRegion: '.dialog__view-container'
    },

    onCloseClick: function() {
      this.hide();
      appNavigator.toIndex();
    },

    onDialogClick: function(ev) {
      if (ev.target === this.el) {
        this.onCloseClick();
      }
    },

    show: function(view) {
      this.render();
      this.viewRegion.show(view.render());
      view.on('close', this.hide, this);
    },

    onDomAttach: function() {
      this.$el.addClass('show');
    },

    hide: function() {
      var _this = this;
      this.$el.detach();
      this.$el.on('transitionend', function() {
        _this.remove();
        _this.$el.off('transitionend');
      });
    }
  });

  DialogView.show = function(view) {
    var dialog = new DialogView();
    dialog.show(view);
    $('.dialog-container').html(dialog.$el);
    setTimeout(function() {
      dialog.onDomAttach();
    }, 50);
    return dialog;
  };

  return DialogView;
});