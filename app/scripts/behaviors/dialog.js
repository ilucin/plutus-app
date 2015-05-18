define(['jquery', 'marionette',
  'helpers/helpers',
  'helpers/behavior-store'
], function($, Marionette,
  helpers,
  behaviorStore
) {
  'use strict';

  var DialogBehavior = Marionette.Behavior.extend({
    onRender: function() {
      var self = this;
      if (!this.$dialogEl) {
        this.$dialogEl = $('<div class="dialog"><div class="__dialog-content"></div></div>');
        this.$dialogContent = this.$dialogEl.find('.__dialog-content');
        this.$dialogEl.on('click', function(ev) {
          if ($(ev.target).parents('.__dialog-content').length === 0) {
            self.view.destroy();
          }
        });
      }

      $('body').append(this.$dialogEl);
      this.$dialogContent.append(this.el);
      setTimeout(function() {
        self.$dialogEl.addClass('shown');
      });
    },

    onBeforeDestroy: function() {
      var self = this;
      helpers.onTransitionEnd(this.$dialogEl[0], function() {
        self.$dialogEl.remove();
        self.view.trigger('dialog-destroy');
      }, 150);
      self.$dialogContent.css({
        width: self.$dialogContent.width() + 'px',
        height: self.$dialogContent.height() + 'px'
      });
      self.$dialogEl.removeClass('shown');
    }
  });

  DialogBehavior.show = function(DialogViewClass) {
    return function(data) {
      var dialogView = new DialogViewClass(data);
      dialogView.render();
      return dialogView;
    };
  };

  behaviorStore.save('Dialog', DialogBehavior);

  return DialogBehavior;
});
