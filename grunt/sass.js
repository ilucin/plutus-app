'use strict';

module.exports = function() {
  return {
    options: {
      sourceMap: true,
      includePaths: ['<%= config.app %>/bower_components', '.tmp/styles']
    },
    dist: {
      files: {
        '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss'
      }
    }
  };
};
