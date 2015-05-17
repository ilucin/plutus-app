'use strict';

module.exports = function(grunt, livereloadPort) {
  return {
    options: {
      nospawn: true,
      livereload: true
    },
    sass: {
      files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
      tasks: ['sass', 'autoprefixer']
    },
    livereload: {
      options: {
        livereload: grunt.option('livereloadport') || livereloadPort
      },
      files: [
        '<%= yeoman.app %>/*.html',
        // '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
        '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
        '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        // '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
        'test/spec/**/*.js'
      ]
    },
    handlebars: {
      files: [
        '<%= yeoman.app %>/scripts/templates/**/*.hbs'
      ],
      tasks: ['handlebars']
    }
  };
};
