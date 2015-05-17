define(['config'], function(appConfig) {
  'use strict';

  if (!!appConfig.fresh) {
    window.localStorage.clear();
  }

  var getItem = function(key) {
    var value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  };

  var setItem = function(key, value) {
    var res;
    try {
      res = window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('An error occurred while saving to local storage!', e);
    }
    return res;
  };

  var storageService = {
    saveSettings: function(settings) {
      setItem('settings', JSON.stringify(settings));
    },

    getSettings: function() {
      var settings = getItem('settings');
      return settings ? JSON.parse(settings) : null;
    },

    saveUser: function(user) {
      setItem('user', JSON.stringify(user));
    },

    getUser: function() {
      var user = getItem('user');
      return user ? JSON.parse(user) : null;
    },

    clear: function() {
      localStorage.clear();
    }
  };

  return storageService;
});
