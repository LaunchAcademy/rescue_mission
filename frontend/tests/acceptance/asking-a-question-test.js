import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Asking a question', {
  beforeEach: function() {
    App = startApp();
    server = new Pretender();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user asks a question', function(assert) {
  server.post('/api/v1/questions', function(request) {
    var questionResponse = {
      title: 'Deploying Rails app to Heroku',
      body: 'I need help deploying my awesome Rails app to Heroku!',
      user_id: 1
    };

    return jsonResponse(201, { question: questionResponse });
  });

  authenticateSession();
  visit('/questions/new');

  fillIn('input[name="title"]', 'Deploying Rails app to Heroku');
  fillIn('textarea[name="body"]', 'I need help deploying my awesome Rails app to Heroku!');

  click('input[type="submit"]');

  andThen(function() {
    assert.ok(hasContent('Thanks for asking!'),
      'Success message displayed');
    assert.equal(currentRouteName(), 'questions.show',
      'Redirected to question show page');
  });
});

test('form cannot be submitted without valid information', function(assert) {
  authenticateSession();

  visit('/questions/new');

  fillIn('.question-form input[name="title"]', '2short');
  fillIn('.question-form textarea[name="body"]', '2short');

  andThen(function() {
    assert.equal(find('input[type="submit"]').attr('disabled'), 'disabled',
      'Submit button is disabled');
  });
});

test('it requires authentication', function(assert) {
  invalidateSession();
  visit('/questions/new');

  andThen(function() {
    assert.ok(hasContent('You need to log in before you can do that'),
      'Prompted to log in');
    assert.notEqual(currentRouteName(), 'questions.new');
  });
});
