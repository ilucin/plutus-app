'use strict';

module.exports = function() {
  return {
    html: '<%= config.app %>/index.html',
    options: {
      dest: '<%= config.dist %>'
    }
  };
};
