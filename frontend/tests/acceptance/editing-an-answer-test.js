import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Editing an Answer', {
  setup: function() {
    App = startApp();

    var users = [
      {
        id: 1,
        username: 'HeroicEric',
      }
    ];

    var question = {
      id: 1,
      answer_ids: [1, 2]
    };

    var answers = [
      {
        id: 1,
        body: 'This answer should be editable. Go ahead, try it!',
        can_edit: true
      },
      {
        id: 2,
        body: 'This answer is not editable. Good luck trying to edit it.',
        user_id: 1
      }
    ];

    server = new Pretender(function(){
      this.get('/api/v1/questions/:id', function(request) {
        return jsonResponse(200, { question: question, answers: answers, users: users });
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('editing an answer requires authorization', function() {
  visit('/questions/1');

  andThen(function() {
    equal(find('#answer-1 .post__action--edit').length, 1,
      'Edit button shown for editable answer');
    equal(find('#answer-2 .post__action--edit').length, 0,
      'Edit button not shown for uneditable answer');
  });
});

test('user edits an answer successfully', function() {
  // Successful response
  server.put('/api/v1/answers/:id', function(request) {
    var answer = JSON.parse(request.requestBody).answer;
    answer.id = request.params.id;

    return jsonResponse(200, { answer: answer });
  });

  var newAnswerBody = 'The best new answer ever written, winnnnning.';

  visit('/questions/1');

  click('#answer-1 .post__action--edit');
  fillIn('.answer-form textarea[name="body"]', newAnswerBody);
  click('#answer-1 input[type="submit"]');

  andThen(function() {
    equal(find('#answer-1 .post__content:contains("' + newAnswerBody + '")').length, 1,
      'Answer body was updated');
  });
});
