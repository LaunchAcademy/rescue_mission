import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Editing a question', {
  setup: function() {
    App = startApp();

    var questions = [
      {
        title: 'Hello world',
        body: 'I love you',
        canEdit: false
      },
      {
        title: 'Hello world',
        body: 'I love you',
        canEdit: true
      }
    ];

    server = new Pretender();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user successfully edits the title of a question', function() {
  server.get('/api/v1/questions/:id', function(request) {
    var question = {
      id: 42,
      title: 'Help me, please!',
      body: 'I have a really big problem',
      can_edit: true
    };

    return jsonResponse(200, { question: question });
  });

  // Successful update response
  server.put('/api/v1/questions/:id', function(request) {
    var question = JSON.parse(request.requestBody).question;
    question.id = request.params.id;

    return jsonResponse(200, { question: question });
  });

  visit('/questions/42');

  andThen(function() {
    equal(find('.page-title:contains("Help me, please!")').length, 1,
      'Starting question title is displayed correctly');
  });

  click('.edit-question-title');
  fillIn('.edit-question-title-form input', 'New question title');
  click('.edit-question-title-form a:contains("Save")');

  andThen(function() {
    equal(find('.page-title:contains("New question title")').length, 1,
      'New question title is displayed correctly');
  });
});

test('user must be able to edit the question to see the edit button', function() {
  server.get('/api/v1/questions/:id', function(request) {
    var question = {
      id: 42,
      can_edit: false
    };

    return jsonResponse(200, { question: question });
  });

  visit('/questions/42');

  equal(find('.edit-question-title').length, 0,
    'Edit question title button not displayed');
});
