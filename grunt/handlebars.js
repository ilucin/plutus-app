'use strict';

module.exports = function() {
  return {
    compile: {
      options: {
        namespace: 'JST',
        amd: true
      },
      files: {
        '.tmp/scripts/templates.js': ['<%= config.app %>/scripts/templates/**/*.hbs']
      }
    }
  };
};
