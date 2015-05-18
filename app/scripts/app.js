define(['underscore', 'backbone',
  'config',
  'services/data',
  'services/navigator',
  'services/device',
  'routes/main'
], function(_, Backbone,
  config,
  data,
  appNavigator,
  device,
  MainRouter
) {
  'use strict';

  var app = window.app = {};

  _.extend(app, {
    init: function() {
      app.data = data;
      window.app = this;

      this.config = config;
      this.router = new MainRouter();
      appNavigator.init(this.router);

      device.init().done(function() {
        app.trigger('init');
      });
    },

    start: function() {
      Backbone.history.start({
        pushState: false
      });
    }

  }, Backbone.Events);

  return app;
});
