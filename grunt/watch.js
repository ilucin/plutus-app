'use strict';

module.exports = function(grunt, livereloadPort) {
  return {
    options: {
      nospawn: true,
      livereload: true
    },
    sass: {
      files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
      tasks: ['sass', 'autoprefixer']
    },
    livereload: {
      options: {
        livereload: grunt.option('livereloadport') || livereloadPort
      },
      files: [
        '<%= config.app %>/*.html',
        // '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
        '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
        '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        // '<%= config.app %>/scripts/templates/*.{ejs,mustache,hbs}',
        'test/spec/**/*.js'
      ]
    },
    handlebars: {
      files: [
        '<%= config.app %>/scripts/templates/**/*.hbs'
      ],
      tasks: ['handlebars']
    }
  };
};
