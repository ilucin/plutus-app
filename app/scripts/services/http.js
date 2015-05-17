define(['underscore', 'promise', 'config'], function(_, Promise, appConfig) {
  'use strict';

  // http.request({
  //   url: {
  //     mock: 'poi-details.json',
  //     route: 'poi/details',
  //     params: {
  //       id: this.id
  //     }
  //   },
  //   method: 'GET',
  //   context: this,
  //   success: function(response) {
  //   }
  // });

  var xhrs = {};
  var config = appConfig.http;

  var http = {

    createUrl: function(options) {
      options = options || {};

      if (!options.noDefaults) {
        options.params = _.defaults(options.params || {}, config.defaultParams);
      }

      var url;

      if (options.mock && appConfig.mock) {
        url = config.mockRoot + options.mock + (options.mock.indexOf('.json') >= 0 ? '' : '.json');
      } else {
        var route = options.route;
        var urlParams = [];

        _.forOwn(options.params, function(value, key) {
          if (route.indexOf(':' + key) >= 0) {
            route = route.replace(':' + key, value);
          } else {
            urlParams.push(key + '=' + value);
          }
        });
        url = config.serverRoot + config.apiRoot + '/' + route + (urlParams.length > 0 ? '/?' + urlParams.join('&') : '');
      }

      return url;
    },

    request: function(params) {
      if (_.isObject(params.url)) {
        params.url = http.createUrl(params.url);
        if (params.xhrKey) {
          http.abortXhr(params.xhrKey);
        }
      }

      if (appConfig.mock) {
        params.method = 'GET';
      }

      return new Promise(function(resolve, reject) {
        var xhr = $.ajax(_.defaults({
          complete: function() {
            if (params.xhrKey && xhrs[params.xhrKey]) {
              xhrs[params.xhrKey] = undefined;
            }
            if (params.complete) {
              params.complete.apply(params.context || this, arguments);
            }
          },
          success: resolve,
          error: reject
        }, params));

        if (params.xhrKey) {
          xhrs[params.xhrKey] = xhr;
        }
      });
    },

    abortXhr: function(xhrKey, xhrs) {
      if (xhrs && xhrs[xhrKey]) {
        console.log('Aborting xhr with same key:', xhrKey);
        xhrs[xhrKey].abort();
        xhrs[xhrKey] = undefined;
      }
    }
  };

  return http;
});
