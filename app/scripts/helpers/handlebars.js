define(['underscore', 'handlebars'], function(_, Handlebars) {
  'use strict';

  var currency;

  Handlebars.registerHelper('money', function(val) {
    return '<span class="value">' + val + ' </span> <span class="currency"> ' + currency + ' </span>';
  });

  return {
    setCurrency: function(c) {
      currency = c;
    }
  };
});
