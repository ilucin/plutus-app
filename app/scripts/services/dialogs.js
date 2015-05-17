define(['jquery'], function($) {
  'use strict';

  return {
    confirm: function(msg) {
      var $d = $.Deferred();
      setTimeout(function() {
        $d.resolve(window.confirm(msg));
      }, 0);
      return $d.promise();
    },
    alert: function(msg) {
      var $d = $.Deferred();
      setTimeout(function() {
        $d.resolve(window.alert(msg));
      }, 0);
      return $d.promise();
    }
  };
});
