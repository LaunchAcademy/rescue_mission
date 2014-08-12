import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Questions Show', {
  setup: function() {
    App = startApp();

    var users = [
      {
        id: 1,
        username: 'HeroicEric',
        question_ids: [42]
      },
      {
        id: 2,
        username: 'OtherGuy',
        question_ids: []
      }
    ];

    var question = {
      id: 1,
      user_id: 1,
      title: 'really bad question title',
      body: 'I write the worst questions',
      answer_ids: [1, 2]
    };

    var answers = [
      {
        id: 1,
        body: 'You should just rm -rf *. That should fix it.',
        question_id: 1,
        user_id: 2
      },
      {
        id: 2,
        body: 'I actually solved this myself by derping the derp',
        question_id: 1,
        user_id: 1,
        can_edit: true
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

test('question details are displayed', function() {
  visit('/questions/1');

  andThen(function() {
    equal(find('.page-title:contains("really bad question")').length, 1,
      'Title found');
    equal(find('#question-1 .post__author:contains("HeroicEric")').length, 1,
      'Author found');
    equal(find('#question-1 .post__content:contains("I write the worst questions")').length, 1,
      'Body found');
  });
});

test('answers are listed on the page', function() {
  visit('/questions/1');

  andThen(function() {
    equal(find('.answers-list .post--answer').length, 2,
      'The correct number of answers are listed');
    ok(hasContent('You should just rm -rf *. That should fix it.'),
      'First answer found');
    ok(hasContent('I actually solved this myself by derping the derp'),
      'Second answer found');
  });
});

test('user answers a question successfully', function() {
  // Successful response
  server.post('/api/v1/answers', function(request) {
    var answerAttrFromRequest = JSON.parse(request.requestBody).answer;
    var answer = Ember.merge(answerAttrFromRequest, { id: 1000, user_id: 2 });
    return jsonResponse(200, { answer: answer });
  });

  var initialAnswerCount;

  authenticateSession();
  visit('/questions/1');

  andThen(function() {
    initialAnswerCount = find('.answers-list .post--answer').length;
  });

  fillIn('.answer-form textarea[name="body"]',
    'I think you just need to restart your computer');
  click('.answer-form input[type="submit"]');

  andThen(function() {
    equal(find('.answers-list .post--answer').length, initialAnswerCount + 1,
      'New answer added to the page');
    ok(hasContent('Thanks for answering!'),
      'Success notification displayed');
    equal(find('.answer-form textarea[name="body"]').val(), "",
      'Answer form is reset');
  });
});

test('user cannot submit an invalid answer', function() {
  authenticateSession();
  visit('/questions/1');

  andThen(function() {
    equal(find('.answer-form input[type="submit"]').attr('disabled'), 'disabled',
      'Answer submit button is disabled');
  });
});

test('posting an answer requires authentication', function() {
  invalidateSession();
  visit('/questions/1');

  andThen(function() {
    equal(find('.answer-form').length, 0, 'Answer form is not displayed');
    equal(find('a:contains("Log in to post an answer")').length, 1,
      'Message to sign in to post an answer displayed');
  });
});
