'use strict';

module.exports = function() {
  return {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
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
        cwd: '<%= config.app %>/bower_components/mapbox.js/images',
        dest: '<%= config.dist %>/images/mapbox/',
        src: ['*.{png,svg}']
      }]
    },
    phonegap: {
      files: [{
        expand: true,
        cwd: '<%= config.dist %>',
        dest: '<%= config.phonegap %>',
        src: ['**/*.*']
      }]
    },
    nw: {
      files: [{
        expand: true,
        cwd: '<%= config.dist %>',
        dest: '<%= config.nw %>',
        src: ['**/*.*']
      }, {
        '<%= config.nw %>/package.json': 'package.json',
        '<%= config.nw %>/nw.js': 'assets/nw.js'
      }]
    }
  };
};
