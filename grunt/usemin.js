'use strict';

module.exports = function() {
  return {
    html: ['<%= config.dist %>/{,*/}*.html'],
    css: ['<%= config.dist %>/styles/{,*/}*.css'],
    options: {
      dirs: ['<%= config.dist %>']
    }
  };
};
