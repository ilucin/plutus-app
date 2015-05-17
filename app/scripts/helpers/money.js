define(function() {
  'use strict';

  var money = {
    validate: function(val) {
      if (isNaN(val)) {
        return 'Invalid money amount';
      }
    },

    parse: function(val) {
      return Math.floor(parseFloat(val, 10) * 100) / 100;
    }
  };

  return money;
});
