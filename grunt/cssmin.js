'use strict';

module.exports = function() {
  return {
    dist: {
      files: {
        '<%= config.dist %>/styles/main.css': [
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/styles/{,*/}*.css'
        ]
      }
    }
  };
};
