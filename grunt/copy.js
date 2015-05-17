'use strict';

module.exports = function() {
  return {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          '*.{ico,txt}',
          '.htaccess',
          'images/{,*/}*.{webp,gif,png,jpg,svg}',
          'styles/fonts/{,*/}*.*',
          'mock/*',
          'fonts/*',
          'vendor/{,*/}*.*'
        ]
      }, {
        expand: true,
        cwd: '<%= yeoman.app %>/bower_components/mapbox.js/images',
        dest: '<%= yeoman.dist %>/images/mapbox/',
        src: ['*.{png,svg}']
      }]
    },
    phonegap: {
      files: [{
        expand: true,
        cwd: '<%= yeoman.dist %>',
        dest: '<%= yeoman.phonegap %>',
        src: ['**/*.*']
      }]
    }
  };
};
