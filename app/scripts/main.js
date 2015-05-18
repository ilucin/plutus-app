/*global require*/
'use strict';

require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery', 'jquery.timeago', 'helpers/handlebars'],
      exports: 'Backbone'
    },
    'marionette': {
      deps: ['backbone', 'backbone.associations', 'backbone.wreqr', 'backbone.babysitter'],
      exports: 'Marionette'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  },
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery',
    'backbone': '../bower_components/backbone/backbone',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'backbone.associations': '../bower_components/backbone-associations/backbone-associations',
    'underscore': '../bower_components/lodash/dist/lodash',
    'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',
    'handlebars': '../bower_components/handlebars/handlebars',
    'fastclick': '../bower_components/fastclick/lib/fastclick',
    'lie': '../bower_components/lie/dist/lie',
    'promise': './helpers/promise',
    'hammer': '../bower_components/hammerjs/hammer',
    'jquery.timeago': '../bower_components/jquery-timeago/jquery.timeago'
  }
});

window.throttleForDebug = function throttleForDebug(fun, ms) {
  var timer;
  return function() {
    if (timer) {
      console.warn('Calling throttled function');
      debugger;
      return;
    }
    fun.apply(this, arguments);
    timer = setTimeout(function() {
      timer = clearTimeout(timer);
    }, ms || 300);
  };
};

window.onerror = function onerror() {
  console.error.apply(console, arguments);
};

require(['app', 'fastclick', 'helpers/toucher'], function(app, fastclick, toucher) {
  fastclick.attach(document.body);
  toucher('.touchable');

  app.on('init', function() {
    app.start.apply(app, arguments);
  });

  app.init();
});
