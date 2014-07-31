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

test('question details are displayed', function() {
  visit('/questions/42');

  andThen(function() {
    equal(find('.page-title:contains("really bad question")').length, 1,
      'Title found');
    equal(find('.question__author:contains("HeroicEric")').length, 1,
      'Author found');
    equal(find('.question__body:contains("I write the worst questions")').length, 1,
      'Body found');
  });
});

test('answers are listed on the page', function() {
  visit('/questions/42');

  andThen(function() {
    equal(find('.answer-list .answer').length, 2,
      'The correct number of answers are listed');
    ok(hasContent('You should just rm -rf *. That should fix it.'),
      'First answer found');
    ok(hasContent('I actually solved this myself by derping the derp'),
      'Second answer found');
  });
});
