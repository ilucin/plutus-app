'use strict';

module.exports = function() {
  return {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= config.app %>/images',
        src: '{,*/}*.{png,jpg,jpeg}',
        dest: '<%= config.dist %>/images'
      }]
    }
  };
};
