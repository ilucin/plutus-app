define(['underscore', 'marionette',
  'helpers/template',
  'helpers/helpers',
  'services/vent',
  'services/navigator',
  'views/dialogs/message'
], function(_, Marionette,
  template,
  helpers,
  vent,
  navigate,
  MessageDialogView
) {
  'use strict';

  var MainView = Marionette.LayoutView.extend({
    el: '#main',
    template: template('main'),
    regions: {
      screenRegion: '.screen'
    },
    events: {
      'click .__navigation-button': 'onNavigationButtonClick'
    },
    ui: {
      $left: '.__left',
      $center: '.__center',
      $right: '.__right',
      $spinner: '.spinner'
    },

    initialize: function() {
      this.render();
      vent.on('navigation:back', this.onBack, this);
      vent.on('navbar:params', this.setNavBarParams, this);

      var $document = $(document);

      $document.ajaxError(this.onAjaxError.bind(this));
      $document.ajaxSend(this.onAjaxSend.bind(this));
      $document.ajaxComplete(this.onAjaxComplete.bind(this));
    },

    showContentView: function(contentView, className, leftItem, title, rightItem, backHandler) {
      if (contentView !== this.contentView) {
        this.contentView = contentView;
        this.contentViewClassName = className;

        this.screenRegion.show(contentView);
      }

      if (!(leftItem === undefined && title === undefined && rightItem === undefined && backHandler === undefined)) {
        this.setNavBarParams(leftItem, title, rightItem, backHandler);
      }
    },

    setNavBarParams: function(leftItem, title, rightItem, backHandler) {
      this.ui.$left.removeClass('__left--' + this.lastLeftItem);
      if (leftItem) {
        this.ui.$left.addClass('__left--' + leftItem);
      }
      this.lastLeftItem = leftItem;

      this.ui.$right.removeClass('__right--' + this.lastRightItem);
      if (rightItem) {
        this.ui.$right.addClass('__right--' + rightItem);
      }
      this.lastRightItem = rightItem;

      if (title === 'plutus') {
        this.ui.$center.html('<div class="__app-title"></div>');
      } else {
        this.ui.$center.text(title || '');
      }

      this.backHandler = backHandler;
    },

    onBack: function() {
      if (this.backHandler) {
        this.backHandler();
      } else {
        navigate.back();
      }
    },

    onNavigationButtonClick: function(ev) {
      vent.trigger('navigation:' + ev.target.getAttribute('data-trigger'));
    },


    onAjaxSend: function(e, xhr, options) {
      var self = this;
      if (!options.dontNotify) {
        this.spinnerTimer = setTimeout(function() {
          self.ui.$spinner.show();
        }, 300);
      }
    },

    onAjaxComplete: function(e, xhr, options) {
      if (!options.dontNotify) {
        if (this.spinnerTimer) {
          clearTimeout(this.spinnerTimer);
          this.spinnerTimer = null;
        }
        this.ui.$spinner.hide();
      }
    },

    onAjaxError: function(e, xhr, options) {
      var messages = {
        404: 'Requested resource doesn\'t exist.',
        500: 'An error occurred on the server',
        0: 'Network action timeout. Please repeat the last action.'
      };
      var message = messages[xhr.status] || xhr.responseJSON.message || 'Error ' + xhr.status;

      if (!options.dontNotify) {
        MessageDialogView.show('Error: ' + message);
      }
    },
  });

  return MainView;
});
