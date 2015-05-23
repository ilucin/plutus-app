define(['promise', 'underscore', 'backbone', 'helpers/servicer'], function(Promise, _, Backbone, servify) {
  'use strict';

  function makeTrigger(obj, ev) {
    return function() {
      obj.trigger(ev);
    };
  }

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
        var self = this;

        return new Promise(function(resolve) {
          if (window.cordova) {
            document.addEventListener('deviceready', function() {
              document.addEventListener('pause', makeTrigger(self, 'pause'));
              document.addEventListener('resume', makeTrigger(self, 'resume'));
              document.addEventListener('backbutton', makeTrigger(self, 'back'));
              // document.addEventListener('menubutton', makeTrigger(self, 'menu'));
              // document.addEventListener('online', makeTrigger(self, 'online'));
              // document.addEventListener('offline',  makeTrigger(self, 'offline'));

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
