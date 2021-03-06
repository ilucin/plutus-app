define(['underscore', 'backbone', 'promise',
  'config',
  'routes/home',
  'views/main',
  'views/about',
  'views/login',
  'views/home',
  'services/data',
  'services/device',
  'services/storage',
  'services/navigator'
], function(_, Backbone, Promise,
  appConfig,
  homeSubrouter,
  MainView,
  AboutView,
  LoginView,
  HomeView,
  data,
  device,
  storage,
  navigate
) {
  'use strict';

  window.location.hash = '';

  var MainRouter = {
    routes: {
      '': 'onIndex',
      'login': 'onLogin',
      'logout': 'onLogout',
      'about': 'onAbout',
      'clear-pin': 'onClearPin'
    },

    initialize: function() {
      this.mainView = new MainView();

      device.on('back', function() {
        var hash = window.location.hash;
        if (hash === '#login' || hash === '#home') {
          device.exit();
        } else {
          navigate.back();
        }
      });

      device.on('resume', function() {
        var hash = window.location.hash;
        if (data.settings.get('isPinEnabled') && hash !== '#login') {
          navigate.toCheckPin();
        }
      });
    },

    onIndex: function() {
      if (data.user.isLoggedIn() && !data.settings.get('isPinEnabled')) {
        navigate.toHome();
      } else {
        navigate.toLogin();
      }
    },

    onAbout: function() {
      this.mainView.showContentView(new AboutView(appConfig), 'about', 'back', '');
    },

    onLogin: function() {
      this.mainView.showContentView(new LoginView({
        model: data.user,
        settings: data.settings,
        mode: data.settings.get('isPinEnabled') ? 'pin' : 'login'
      }), 'login', '', '');
    },

    onLogout: function() {
      storage.clear();
      window.location.reload();
    }
  };

  function createSubrouteHandler(subrouter, methodName, subrouterMethod, screenName) {
    MainRouter[methodName] = function() {
      var self = this;
      this.mainView.$el.attr('data-route', screenName);
      this.mainView.showContentView(subrouter.getView());
      var menuParams = subrouterMethod.apply(this, arguments);
      if (_.isArray(menuParams)) {
        this.mainView.setNavBarParams.apply(this.mainView, menuParams);
      } else if (menuParams instanceof Promise) {
        menuParams.then(function(mp) {
          self.mainView.setNavBarParams.apply(self.mainView, mp);
        });
      }
    };
  }

  _.each([homeSubrouter], function(subrouter) {
    var namespace = subrouter.routeNamespace;

    _.each(subrouter.routes, function(methodName, subroute) {
      var subrouteMethodName = 'on_' + namespace + '_' + subroute;
      var screenName = (namespace + '-' + subroute.replace(':', '').replace('/', '-'));
      MainRouter.routes[namespace + (subroute ? ('/' + subroute) : '')] = subrouteMethodName;
      createSubrouteHandler(subrouter, subrouteMethodName, subrouter[methodName], screenName);
    });
  });

  MainRouter = Backbone.Router.extend(MainRouter);
  return MainRouter;
});
