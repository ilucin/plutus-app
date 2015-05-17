'use strict';

module.exports = function() {
  return {
    phonegap: {
      options: {
        questions: [{
          config: 'phonegap',
          type: 'checkbox',
          message: 'What do you want to do?',
          default: '',
          choices: [{
            name: 'grunt build',
            value: 'gruntBuild',
            checked: true
          }, {
            name: 'cordova build',
            value: 'cordovaBuild',
            checked: true
          }, {
            name: 'cordova run',
            value: 'cordovaRun',
            checked: true
          }, {
            name: 'android',
            value: 'android',
            checked: true
          }, {
            name: 'ios',
            value: 'ios',
            checked: false
          }],
          filter: function(value) {
            if (value.length === 0) {
              value = ['grunt-build', 'cordova-build'];
            }
            return value;
          }
        }]
      }
    }
  };
};
