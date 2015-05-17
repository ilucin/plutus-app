'use strict';

module.exports = function() {
  return {
    dist: ['.tmp', '<%= yeoman.dist %>/*'],
    server: '.tmp'
  };
};
