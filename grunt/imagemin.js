'use strict';

module.exports = function(grunt) {
  return {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeoman.app %>/images',
        src: '{,*/}*.{png,jpg,jpeg}',
        dest: '<%= yeoman.dist %>/images'
      }]
    }
  };
};
