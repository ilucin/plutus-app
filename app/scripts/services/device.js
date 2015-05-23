/*global define*/
define(['promise', 'underscore', 'backbone', 'helpers/servicer'], function(Promise, _, Backbone, servify) {
  'use strict';

  var service = servify({
    default: {
      init: function() {
        return Promise.resolve();
      },

      exit: function() {
        window.alert('Exiting application.');
        window.location.reload();
      }
    },

    phonegap: {
      init: function() {
        var _this = this;

        return new Promise(function(resolve) {
          if (window.cordova) {
            document.addEventListener('deviceready', function() {

              document.addEventListener('pause', function() {
                _this.trigger('pause');
              });

              document.addEventListener('resume', function() {
                _this.trigger('resume');
              });

              document.addEventListener('backbutton', function() {
                _this.trigger('back');
              });

              document.addEventListener('menubutton', function() {
                _this.trigger('menu');
              });

              document.addEventListener('online', function() {
                _this.trigger('online');
              });

              document.addEventListener('offline', function() {
                _this.trigger('offline');
              });

              resolve();
            }, false);
          } else {
            resolve();
          }
        });
      },

      exit: function() {
        console.log('Exiting app');
        if (window.navigator.app) {
          window.navigator.app.exitApp();
        } else if (navigator.device) {
          window.navigator.device.exitApp();
        }
      }
    }
  });

  _.extend(service, Backbone.Events);

  return service;
});
