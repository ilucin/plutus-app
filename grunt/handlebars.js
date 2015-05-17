'use strict';

module.exports = function() {
  return {
    compile: {
      options: {
        namespace: 'JST',
        amd: true
      },
      files: {
        '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/**/*.hbs']
      }
    }
  };
};
