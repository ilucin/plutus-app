'use strict';

var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt, lrSnippet, configConfig, SERVER_PORT) {
  return {
    options: {
      port: grunt.option('port') || SERVER_PORT,
      // change this to '0.0.0.0' to access the server from outside
      hostname: '0.0.0.0'
    },
    livereload: {
      options: {
        middleware: function(connect) {
          return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, configConfig.app)
          ];
        }
      }
    },
    dist: {
      options: {
        middleware: function(connect) {
          return [
            mountFolder(connect, configConfig.dist)
          ];
        }
      }
    }
  };
};
