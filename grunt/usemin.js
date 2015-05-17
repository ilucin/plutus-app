'use strict';

module.exports = function(grunt) {
  return {
    html: ['<%= yeoman.dist %>/{,*/}*.html'],
    css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
    options: {
      dirs: ['<%= yeoman.dist %>']
    }
  };
};
