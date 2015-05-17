'use strict';

module.exports = function() {
  return {
    server: {
      path: 'http://localhost:<%= connect.options.port %>'
    },
    test: {
      path: 'http://localhost:<%= connect.test.options.port %>'
    }
  };
};
