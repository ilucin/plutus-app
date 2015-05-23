'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 10000;

var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});

var cordovaScript = '<script src=\"cordova.js\"></script>';
var nwScript = '<script src=\"nw.js\"></script>';

module.exports = function(grunt) {
  // require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var date = new Date();

  var config = {
    app: 'app',
    dist: 'dist',
    phonegap: 'phonegap/www',
    nw: 'nw'
  };

  grunt.initConfig({
    env: grunt.option('env') || process.env.GRUNT_ENV || 'development',
    build: grunt.option('build'),
    script: grunt.option('build') === 'phonegap' ? cordovaScript : '',
    time: date.toDateString() + ' ' + date.toTimeString().split(' ')[0],
    config: config,

    watch: require('./grunt/watch')(grunt, LIVERELOAD_PORT),
    connect: require('./grunt/connect')(grunt, lrSnippet, config, SERVER_PORT),
    prompt: require('./grunt/prompt')(grunt),
    jshint: require('./grunt/jshint')(grunt),
    autoprefixer: require('./grunt/autoprefixer')(grunt),
    open: require('./grunt/open')(grunt),
    clean: require('./grunt/clean')(grunt),
    sass: require('./grunt/sass')(grunt),
    requirejs: require('./grunt/requirejs')(grunt),
    useminPrepare: require('./grunt/usemin-prepare')(grunt),
    usemin: require('./grunt/usemin')(grunt),
    imagemin: require('./grunt/imagemin')(grunt),
    cssmin: require('./grunt/cssmin')(grunt),
    htmlmin: require('./grunt/htmlmin')(grunt),
    copy: require('./grunt/copy')(grunt),
    bower: require('./grunt/bower')(grunt),
    handlebars: require('./grunt/handlebars')(grunt),
    rev: require('./grunt/rev')(grunt),
    // uglify: require('./grunt/uglify')(grunt),
    shell: require('./grunt/shell')(grunt)
  });

  grunt.config('copy.index', {
    src: '<%= config.dist %>/index.html',
    dest: '<%= config.dist %>/index.html',
    options: {
      process: function(content) {
        return grunt.template.process(content);
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function() {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'createDefaultTemplate',
      'handlebars',
      'sass',
      'autoprefixer',
      'connect:livereload',
      // 'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('build', function(target) {
    var tasks = [
      'clean:dist',
      'createDefaultTemplate',
      'handlebars',
      'sass',
      'autoprefixer',
      'useminPrepare',
      'requirejs',
      // 'imagemin',
      'htmlmin',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      // 'rev',
      'usemin',
      'copy:index'
    ];

    grunt.task.run(tasks);
  });

  grunt.registerTask('phonegap', function(target) {
    if (target === 'no-prompt') {
      grunt.config('phonegap', ['gruntBuild', 'cordovaBuild', 'cordovaRun', 'android']);
      grunt.task.run(['phonegap-after']);
    } else {
      grunt.task.run(['prompt:phonegap', 'phonegap-after']);
    }
  });

  grunt.registerTask('phonegap-after', function() {
    var phonegapConfig = {};
    grunt.config('phonegap').map(function(val) {
      phonegapConfig[val] = val;
    });

    var tasks = [];

    if (phonegapConfig.gruntBuild) {
      grunt.config('env', 'production');
      grunt.config('script', cordovaScript);
      grunt.config('build', 'phonegap');
      tasks.push('build', 'clean:phonegap', 'copy:phonegap');
    }

    if (phonegapConfig.cordovaBuild) {
      if (phonegapConfig.android) {
        tasks.push('shell:cordovaBuildAndroid');
      } else if (phonegapConfig.ios) {
        tasks.push('shell:cordovaBuildIos');
      } else {
        tasks.push('shell:cordovaBuild');
      }
    }

    if (phonegapConfig.cordovaRun) {
      if (phonegapConfig.android) {
        tasks.push('shell:cordovaRunAndroid');
      } else if (phonegapConfig.ios) {
        tasks.push('shell:cordovaRunIos');
      } else {
        grunt.log.write('You wanted to run "cordova run" but you didn\'t specify platform');
      }
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('nw', function() {
    grunt.config('env', 'development');
    grunt.config('script', nwScript);
    grunt.config('build', 'desktop');

    grunt.task.run(['clean:nw', 'build', 'copy:nw']);
  });

  grunt.registerTask('phonegap-prepare', ['build', 'copy:phonegap']);

  grunt.registerTask('default', ['serve']);
};
