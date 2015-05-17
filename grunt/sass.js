'use strict';

module.exports = function() {
  return {
    options: {
      sourceMap: true,
      includePaths: ['<%= yeoman.app %>/bower_components', '.tmp/styles']
    },
    dist: {
      files: {
        '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.scss'
      }
    }
  };
};
