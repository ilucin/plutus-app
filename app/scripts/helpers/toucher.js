define(['underscore', 'jquery'], function(_, $) {
  'use strict';

  var $document = $(document);

  var activeEls = [];

  function clearActiveEls() {
    if (activeEls.length > 0) {
      for (var i = 0; i < activeEls.length; i++) {
        activeEls[i].className = activeEls[i].className.replace(' active', '');
      }
      activeEls.length = 0;
    }
  }

  return function(selector) {
    $document.on('touchstart', selector, function(e) {
      e.stopPropagation();

      if (this.className.indexOf('disabled') >= 0) {
        e.preventDefault();
      }

      clearActiveEls();
      activeEls.push(this);
      this.className += ' active';
    });
    $document.on('touchend', clearActiveEls);
    $document.on('touchmove', clearActiveEls);
  };
});
