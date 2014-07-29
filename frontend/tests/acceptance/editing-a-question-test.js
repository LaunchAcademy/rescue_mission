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

  click('.question__title__edit');
  fillIn('.question__title__edit-form input', 'New question title');
  click('.question__title__edit-form a:contains("Save")');

  andThen(function() {
    equal(find('.page-title:contains("New question title")').length, 1,
      'New question title is displayed correctly');
  });
});

test('user successfully edits the body of a question', function() {
  server.get('/api/v1/questions/:id', function(request) {
    var question = {
      id: 42,
      title: 'Help me, please!',
      body: 'The origin body content',
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
    equal(find('.question__body:contains("The origin body content")').length, 1,
      'Starting question body is displayed correctly');
  });

  click('.question__body__edit');
  fillIn('.question__body__edit-form textarea', 'New content for body');
  click('.question__body__edit-form a:contains("Save")');

  andThen(function() {
    equal(find('.question__body:contains("New content for body")').length, 1,
      'New question title is displayed correctly');
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

