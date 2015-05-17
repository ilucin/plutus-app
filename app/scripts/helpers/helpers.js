/*global define*/
define(['jquery'], function($) {
  'use strict';

  var TRANSITION_END = ('ontransitionend' in window ? 'transitionend' : ('onwebkittransitionend' in window ? 'webkitTransitionEnd' : null));

  return {
    getMock: function(file) {
      var data;
      $.ajax({
        url: 'mock/' + file + '.json',
        async: false
      }, function(res) {
        data = res;
      });
      return data;
    },

    getUrlParam: function(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regexS = '[\\?&]' + name + '=([^&#]*)';
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if (results === null) {
        return '';
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
    },

    isIosDevice: function() {
      return !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i);
    },

    getIosVersion: function() {
      var agent = window.navigator.userAgent;
      var start = agent.indexOf('OS');
      if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
        return window.Number(agent.substr(start + 3, 3).replace('_', '.'));
      }
      return 0;
    },

    setStyleWithPrefixes: function(el, styleName, value) {
      el.style[styleName] = value;
      el.style['-webkit-' + styleName] = value;
      el.style['-moz-' + styleName] = value;
    },

    onTransitionEnd: function(el, clb, time, forceTimeout) {
      var onTransitionEnd = function(ev) {
        ev.stopPropagation();
        el.removeEventListener(TRANSITION_END, onTransitionEnd);
        clb(ev);
      };

      if (TRANSITION_END && !forceTimeout) {
        el.addEventListener(TRANSITION_END, onTransitionEnd);
      } else {
        window.setTimeout(clb, time);
      }
    }
  };
});
