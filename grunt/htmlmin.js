'use strict';

module.exports = function() {
  return {
    dist: {
      options: {},
      files: [{
        expand: true,
        cwd: '<%= config.app %>',
        src: '*.html',
        dest: '<%= config.dist %>'
      }]
    }
  };
};
