/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'rescue-mission',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      providers: {
        'github-oauth2': {
          scope: 'user:email'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.host = 'http://localhost:3000';
    ENV.torii.providers['github-oauth2'].apiKey = '5c4f826abba8e1f95028';

    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:oauth2-bearer',
      crossOriginWhitelist: [ENV.host]
    };

    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: ENV.host + '/api/v1/authentications'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
  }

  if (environment === 'production') {
    ENV.host = 'https://rescue-mission.launchacademy.com';
    ENV.torii.providers['github-oauth2'].apiKey = '1cf01a0807b2e1f7d2b5';

    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:oauth2-bearer'
    };

    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: ENV.host + '/api/v1/authentications'
    };
  }

  return ENV;
};
