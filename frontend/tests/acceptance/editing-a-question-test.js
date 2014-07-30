import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Editing a question', {
  setup: function() {
    App = startApp();
    server = new Pretender();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user successfully edits a question', function() {
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

  click('.post-action--edit');
  fillIn('.question-form input[name="title"]',
    'Awesome new title for the question');
  fillIn('.question-form textarea[name="body"]',
    'Awesome new body for the question');
  click('.question-form input[type="submit"]');

  andThen(function() {
    equal(find('.page-title:contains("Awesome new title for the question")').length, 1,
      'Question title is updated');
    equal(find('.question__body:contains("Awesome new body for the question")').length, 1,
      'Question body is updated');
  });
});

test('user must be able to edit the question to see the edit buttons', function() {
  server.get('/api/v1/questions/:id', function(request) {
    var question = {
      id: 42,
      can_edit: false
    };

    return jsonResponse(200, { question: question });
  });

  visit('/questions/42');

  equal(find('.question__title__edit').length, 0,
    'Edit question title button not displayed');
  equal(find('.question__body__edit').length, 0,
    'Edit question title button not displayed');
});
