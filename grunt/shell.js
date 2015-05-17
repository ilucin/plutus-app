'use strict';

module.exports = function() {
  return {
    cordovaBuild: {
      command: 'cd phonegap; cordova build'
    },
    cordovaBuildAndroid: {
      command: 'cd phonegap; cordova build android'
    },
    cordovaBuildIos: {
      command: 'cd phonegap; cordova build ios'
    },
    cordovaRunAndroid: {
      command: 'cd phonegap; cordova run android'
    },
    cordovaRunIos: {
      command: 'cd phonegap; cordova run ios'
    }
  };
};
