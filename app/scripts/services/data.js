define([
  'models/user',
  'models/settings'
], function(
  UserModel,
  SettingsModel
) {
  'use strict';

  var data = {
    user: new UserModel(),
    settings: new SettingsModel()
  };

  return data;
});
