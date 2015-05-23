'use strict';

module.exports = function() {
  return {
    dist: ['.tmp', '<%= config.dist %>/*'],
    server: '.tmp',
    nw: ['<%= config.nw %>/*'],
    phonegap: ['<%= config.phonegap %>/*']
  };
};
