'use strict';

module.exports = function() {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'Gruntfile.js',
      '<%= yeoman.app %>/scripts/{,*/}*.js',
      '!<%= yeoman.app %>/scripts/vendor/*',
      'test/spec/{,*/}*.js'
    ]
  };
};
