define(['jquery', 'config'], function(config) {
  'use strict';

  return function(services) {
    if ('phonegap' in services && config.build === 'phonegap') {
      return services.phonegap;
    } else if ('web' in services && config.build === 'web') {
      return services.web;
    } else if ('mock' in services && config.mock) {
      return services.mock;
    } else if ('default' in services) {
      return services.default;
    } else {
      return services;
    }
  };
});
