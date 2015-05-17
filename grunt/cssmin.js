'use strict';

module.exports = function() {
  return {
    dist: {
      files: {
        '<%= yeoman.dist %>/styles/main.css': [
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/styles/{,*/}*.css'
        ]
      }
    }
  };
};
