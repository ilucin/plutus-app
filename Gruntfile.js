'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 10000;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var date = new Date();

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    phonegap: 'phonegap/www'
  };

  grunt.initConfig({
    env: grunt.option('env') || process.env.GRUNT_ENV || 'development',
    phonegapScript: grunt.option('build') === 'phonegap' ? '<script src=\"cordova.js\"></script>' : '',
    time: date.toDateString() + ' ' + date.toTimeString().split(' ')[0],
    yeoman: yeomanConfig,

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/*.html',
          // '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          // '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
          'test/spec/**/*.js'
        ]
      },
      handlebars: {
        files: [
          '<%= yeoman.app %>/scripts/templates/**/*.hbs'
        ],
        tasks: ['handlebars']
      }
    },
    connect: {
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
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },

    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },

    autoprefixer: {
      dist: {
        browsers: ['last 2 versions', 'iOS'],
        files: {
          '.tmp/styles/main.css': '.tmp/styles/main.css'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    mocha: {
      all: {
        options: {
          run: true,
          src: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    sass: {
      options: {
        sourceMap: true,
        includePaths: ['<%= yeoman.app %>/bower_components', '.tmp/styles']
      },
      dist: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.scss'
        }
      }
    },

    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: '<%= yeoman.app %>/scripts',
          optimize: 'none',
          paths: {
            'templates': '../../.tmp/scripts/templates'
          },
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true
            // wrap: true
            //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif,png,jpg,svg}',
            'styles/fonts/{,*/}*.*',
            'mock/*',
            'fonts/*',
            'vendor/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/mapbox.js/images',
          dest: '<%= yeoman.dist %>/images/mapbox/',
          src: ['*.{png,svg}']
        }]
      },
      phonegap: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          dest: '<%= yeoman.phonegap %>',
          src: ['**/*.*']
        }]
      }
    },

    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'JST',
          amd: true
        },
        files: {
          '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/**/*.hbs']
        }
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '/styles/fonts/{,*/}*.*',
          ]
        }
      }
    }
  });

  grunt.config('copy.index', {
    src: '<%= yeoman.dist %>/index.html',
    dest: '<%= yeoman.dist %>/index.html',
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

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'createDefaultTemplate',
        'handlebars',
        'sass',
        'connect:test',
        'open:test',
        'watch'
      ]);
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

  grunt.registerTask('test', function(isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
      'clean:server',
      'createDefaultTemplate',
      'handlebars',
      'sass',
      'connect:test',
      'mocha',
    ];

    if (!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('build', [
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
  ]);

  grunt.registerTask('phonegap-prepare', ['build', 'copy:phonegap']);

  grunt.registerTask('default', ['serve']);
};
