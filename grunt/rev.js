'use strict';

module.exports = function() {
  return {
    dist: {
      files: {
        src: [
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css',
          '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '/styles/fonts/{,*/}*.*',
        ]
      }
    }
  };
};
