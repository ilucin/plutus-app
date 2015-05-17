/*global define*/
define(['jquery', 'underscore', 'backbone', 'helpers/servicer'], function($, _, Backbone, servify) {
  'use strict';

  var service = servify({
    default: {
      init: function() {
        return $.Deferred().resolve().promise();
      },

      exit: function() {
        window.alert('Exiting application.');
        window.location.reload();
      }
    },

    phonegap: {
      init: function() {
        var $d = $.Deferred();
        var _this = this;

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

            $d.resolve();
          }, false);
        } else {
          $d.resolve();
        }

        return $d.promise();
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
