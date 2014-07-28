import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Asking a question', {
  setup: function() {
    App = startApp();

    var user = {
      id: 1,
      username: 'HeroicEric'
    };

    server = new Pretender(function(){
      this.get('/api/v1/users/:id', function(request) {
        return jsonResponse(200, { user: user });
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user asks a question', function() {
  server.post('/api/v1/questions', function(request) {
    var questionResponse = {
      title: 'Help me, please!',
      body: 'I have a really big problem',
      user_id: 1
    };

    return jsonResponse(201, { question: questionResponse });
  });

  authenticateSession();
  visit('/questions/new');

  fillIn('#question-title', 'Help me, please!');
  fillIn('#question-body', 'I have a really big problem');
  click('button:contains("Ask")');

  andThen(function() {
    ok(hasContent('Thanks for asking!'),
      'Success message displayed');
    equal(currentRouteName(), 'questions.show',
      'Redirected to question show page');
  });
});

test('errors are displayed when asking question fails', function() {
  server.post('/api/v1/questions', function(request) {
    var errors = {
      title: ["can't be blank"],
      body: ["can't be blank"],
    };

    return jsonResponse(422, { errors: errors });
  });

  authenticateSession();

  visit('/questions/new');
  click('button:contains("Ask")');

  andThen(function() {
    equal(currentRouteName(), 'questions.new',
      'User stays on new question page');
    ok(hasContent('There were some errors with your question.'),
      'Error message displayed');
  });
});

test('it requires authentication', function() {
  invalidateSession();
  visit('/questions/new');

  andThen(function() {
    ok(hasContent('You need to log in before you can do that'),
      'Prompted to log in');
    notEqual(currentRouteName(), 'questions.new');
  });
});
