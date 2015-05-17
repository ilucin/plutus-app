define(['underscore', 'jquery', 'helpers/helpers'], function(_, $, helpers) {
  'use strict';

  var validEnvironments = {
    development: 'development',
    production: 'production'
  };

  if (window.ENV === '<%= env %>') {
    window.ENV = 'development';
  }

  var env = !!validEnvironments[window.ENV] ? validEnvironments[window.ENV] : (helpers.getUrlParam('env') || 'production');
  var isBuild = !('IS_BUILD' in window);

  var config = {
    version: '0.0.1',
    developer: 'lucin.ivan@gmail.com',
    mock: !!helpers.getUrlParam('mock'),
    hasTouch: !$('html').hasClass('no-touch'),
    build: isBuild ? (!!window.cordova ? 'phonegap' : 'web') : 'dev',
    isBuild: isBuild,
    env: env
  };

  var envs = {
    production: {
      http: {
        serverRoot: window.cordova ? 'http://46.101.174.79:3000' : '',
        apiRoot: '/api',
        mockRoot: 'mock/'
      }
    },

    development: {
      http: {
        serverRoot: 'http://localhost:3000',
        apiRoot: '/api',
        mockRoot: 'mock/'
      }
    }
  };

  var buildOverwrites = {};

  config = _.defaults(!!envs[env] ? envs[env] : envs.development, config);
  if (isBuild) {
    _.extend(config, buildOverwrites);
  }

  return config;
});
