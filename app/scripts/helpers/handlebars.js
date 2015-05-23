define(['underscore', 'handlebars'], function(_, Handlebars) {
  'use strict';

  var currency;

  Handlebars.registerHelper('money', function(val) {
    return '<span class="value">' + parseFloat(val, 10).toFixed(2) + ' </span> <span class="currency"> ' + currency + ' </span>';
  });

  return {
    setCurrency: function(c) {
      currency = c;
    }
  };
});
