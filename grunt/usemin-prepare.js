'use strict';

module.exports = function(grunt) {
  return {
    html: '<%= yeoman.app %>/index.html',
    options: {
      dest: '<%= yeoman.dist %>'
    }
  };
};
