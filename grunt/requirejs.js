'use strict';

module.exports = function() {
  return {
    dist: {
      options: {
        baseUrl: '<%= config.app %>/scripts',
        optimize: 'none',
        paths: {
          'templates': '../../.tmp/scripts/templates'
        },
        preserveLicenseComments: false,
        useStrict: true
      }
    }
  };
};
