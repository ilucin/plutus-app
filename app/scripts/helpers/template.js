/*global define*/
define(['templates'], function(JST) {
  'use strict';

  var template = function(templateFile) {
    return JST['app/scripts/templates/' + templateFile + '.hbs'];
  };

  return template;
});