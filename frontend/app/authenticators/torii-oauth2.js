import Ember from 'ember';
import OAuth2 from 'simple-auth-oauth2/authenticators/oauth2';

export default OAuth2.extend({
  authenticate: function(options) {
    return this.fetchOauthData(options).then(this.fetchAccessToken.bind(this));
  },

  fetchAccessToken: function(oauthCredentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.makeRequest(_this.serverTokenEndpoint, oauthCredentials).then(function(response) {
        var apiKey = response.api_key;

        Ember.run(function() {
          var expiresAt = _this.absolutizeExpirationTime(apiKey.expires_in);
          _this.scheduleAccessTokenRefresh(apiKey.expires_in, expiresAt, apiKey.refresh_token);
          resolve(Ember.$.extend(apiKey, { expires_at: expiresAt }));
        });
      }, function(xhr) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  fetchOauthData: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      options.torii.open(options.provider).then(function(oauthData) {
        resolve({
          grant_type: 'authorization_code',
          provider: oauthData.provider,
          code: oauthData.authorizationCode
        });
      }, function(error) {
        reject(error);
      });
    });
  }
});
