define(['underscore', 'marionette', 'hammer', 'config',
  'helpers/helpers',
  'helpers/template',
  'services/vent',
  'services/navigator',
  'services/data',
  'views/home/menu'
], function(_, Marionette, Hammer, config,
  helpers,
  template,
  vent,
  navigate,
  data,
  MenuView
) {
  'use strict';

  var MENU_WIDTH = 200;

  var HomeView = Marionette.LayoutView.extend({
    template: template('home'),
    className: 'home',
    events: {
      'click .__menu-underlay': 'onMenuUnderlayClick'
    },
    regions: {
      menuRegion: '.__menu-container',
      pageRegion: '.__page-container'
    },
    ui: {
      $menuUnderlay: '.__menu-underlay'
    },

    initialize: function() {
      this.menuView = new MenuView({
        model: data.settings
      });
      this.listenTo(this.menuView, 'close', this._onMenuClose, this);
      this.listenTo(this.menuView, 'menu:item', this.onMenuItem, this);
      this.listenTo(vent, 'navigation:menu', this._toggleMenu, this);
    },

    onRender: function() {
      this.menuRegion.show(this.menuView);
      if (config.hasTouch) {
        this._setupSwipeHandler();
      }
    },

    showContentView: function(ContentView, opts) {
      var self = this;
      this.pageRegion._ensureElement();
      if (!(this.contentView instanceof ContentView)) {
        this.contentView = new ContentView(opts);
        if (this.pageRegion.$el.length === 0) {
          this.pageRegion.show(this.contentView);
        } else {
          helpers.onTransitionEnd(this.pageRegion.$el[0], function() {
            self.pageRegion.show(self.contentView);
            self.pageRegion.$el.removeClass('hiding');
          }, 300);
          this.pageRegion.$el.addClass('hiding');
        }
      }

      return this.contentView;
    },

    _toggleMenu: function() {
      this.menuRegion.$el.addClass('left-transition');
      if (this.menuRegion.opened) {
        this.closeMenuBar();
      } else {
        this.openMenuBar();
      }
    },

    onMenuItem: function(item) {
      if (location.hash === '#home/menu') {
        navigate.backSilently();
      }
      navigate.to(item);
    },

    onMenuUnderlayClick: function() {
      navigate.back();
    },

    openMenuBar: function() {
      var menuUnderlayEl = this.ui.$menuUnderlay[0];

      if (!this.menuRegion.opened) {
        this.menuRegion.opened = true;
        this.menuRegion.$el.addClass('opened');
        this.$el.addClass('home--menu-opened');
        navigate.toMenu();

        menuUnderlayEl.style.opacity = 0;
        menuUnderlayEl.className = '__menu-underlay shown has-transition';
        helpers.onTransitionEnd(menuUnderlayEl, function() {
          menuUnderlayEl.className = '__menu-underlay shown';
        }, 300);

        setTimeout(function() {
          menuUnderlayEl.style.opacity = 1;
        }, 0);
      }
    },

    closeMenuBar: function() {
      var menuUnderlayEl = this.ui.$menuUnderlay[0];

      if (this.menuRegion.opened) {
        this.menuRegion.opened = false;
        this.menuRegion.$el.removeClass('opened');
        this.$el.removeClass('home--menu-opened');
      }

      menuUnderlayEl.className += ' has-transition';
      helpers.onTransitionEnd(menuUnderlayEl, function() {
        menuUnderlayEl.className = '__menu-underlay';
      }, 300);
      menuUnderlayEl.style.opacity = 0;
    },

    _onMenuHandleClick: function(ev) {
      ev.stopImmediatePropagation();
    },

    _setupSwipeHandler: function() {
      var self = this;
      var menuRegion = this.menuRegion;
      var menuEl = menuRegion.el;
      var $menuEl = menuRegion.$el;
      var menuUnderlayEl = this.ui.$menuUnderlay[0];
      var halfMenu = MENU_WIDTH / 2;
      var panMoveCounter;
      var currLeft;
      var style = helpers.setStyleWithPrefixes;

      this.mcMenu = new Hammer(menuEl);

      function animateToEnd(el, startVal, destVal, step, onDone) {
        var currVal = startVal;

        function animator() {
          currVal = startVal > destVal ? (currVal - step) : (currVal + step);

          if ((startVal > destVal && currVal > destVal) || (startVal < destVal && currVal < destVal)) {
            style(el, 'transform', 'translate3d(' + currVal + 'px, 0, 0)');
            window.requestAnimationFrame(animator);
          } else {
            style(el, 'transform', 'translate3d(' + destVal + 'px, 0, 0)');
            onDone();
          }
        }

        window.requestAnimationFrame(animator);
      }

      function onPanStart() {
        menuRegion.$el.removeClass('left-transition');
        menuUnderlayEl.className = '__menu-underlay shown';
        panMoveCounter = 0;
      }

      function onPanMove(ev) {
        panMoveCounter++;
        if (ev.direction === Hammer.DIRECTION_RIGHT || ev.direction === Hammer.DIRECTION_LEFT) {
          currLeft = Math.min(Math.max(-MENU_WIDTH, ev.deltaX - (menuRegion.opened ? 0 : MENU_WIDTH)), 0);
          style(menuEl, 'transform', 'translate3d(' + currLeft + 'px, 0, 0)');
        }
      }

      function shouldOpen(ev) {
        return (ev.direction === Hammer.DIRECTION_LEFT && ev.velocityX < 0.7) || (ev.direction === Hammer.DIRECTION_RIGHT && ev.velocityX < -0.7) || (ev.distance > halfMenu && !menuRegion.opened) || (ev.distance < halfMenu && menuRegion.opened);
      }

      function shouldOpen2(ev) {
        return (ev.distance > halfMenu && !menuRegion.opened) || (ev.distance < halfMenu && menuRegion.opened);
      }

      function onPanEnd(ev) {
        var shouldOpenFlag = shouldOpen(ev);

        animateToEnd(menuEl, currLeft, shouldOpenFlag ? 0 : -MENU_WIDTH, Math.max(Math.abs(ev.velocityX * 10), 6), function() {
          $menuEl.addClass('left-transition');

          if (shouldOpenFlag) {
            self.openMenuBar();
          } else {
            if (menuRegion.opened) {
              navigate.back();
            } else {
              self.closeMenuBar();
            }
          }
          setTimeout(function() {
            style(menuEl, 'transform', '');
          }, 200);
        });
      }

      this.mcMenu.on('panstart', onPanStart);
      this.mcMenu.on('panmove', onPanMove);
      this.mcMenu.on('panend', onPanEnd);
    }

  });

  return HomeView;
});
