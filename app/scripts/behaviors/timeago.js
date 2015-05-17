define(['jquery', 'marionette', 'jquery.timeago',
  'helpers/behavior-store'
], function($, Marionette, jqueryTimeago,
  behaviorStore
) {
  'use strict';

  var TimeagoBehavior = Marionette.Behavior.extend({
    defaults: {
      'className': '.datetime'
    },

    onRender: function() {
      this.$(this.options.className).timeago();
    }
  });

  behaviorStore.save('Timeago', TimeagoBehavior);

  return TimeagoBehavior;
});
