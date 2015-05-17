'use strict';

module.exports = function() {
  return {
    dist: {
      options: {},
      files: [{
        expand: true,
        cwd: '<%= yeoman.app %>',
        src: '*.html',
        dest: '<%= yeoman.dist %>'
      }]
    }
  };
};
