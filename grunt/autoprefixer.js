'use strict';

module.exports = function() {
  return {
    dist: {
      browsers: ['last 2 versions', 'iOS'],
      files: {
        '.tmp/styles/main.css': '.tmp/styles/main.css'
      }
    }
  };
};
