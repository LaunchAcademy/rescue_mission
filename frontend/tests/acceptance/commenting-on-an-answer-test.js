import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Commenting on an Answer', {
  setup: function() {
    App = startApp();

    var question = {
      id: 1,
      answer_ids: [1, 2]
    };

    var answers = [
      {
        id: 1,
        question_id: 1,
        body: 'You should just rm -rf *. That should fix it.'
      },
      {
        id: 2,
        question_id: 1,
        body: 'I actually solved this myself by derping the derp'
      }
    ];

    server = new Pretender(function(){
      this.get('/api/v1/questions/1', function(request){
        return jsonResponse(200, { question: question, answers: answers });
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user successfully comments on an answer', function() {
  server.post('/api/v1/comments', function(request) {
    var commentResponse = {
      id: 99,
      body: 'Can you create a jsbin that recreates your issue?',
      commentable_id: 1,
      commentable_type: 'Answer'
    };

    return jsonResponse(201, { comment: commentResponse });
  });

  authenticateSession();
  visit('/questions/1');

  var initialCommentCount;
  andThen(function() {
    initialCommentCount = find('#answer-1 .comment-list .comment').length;
  });

  click('#answer-1 .add-comment');
  fillIn('#answer-1 .comment-form textarea[name="body"]',
    'Can you create a jsbin that recreates your issue?');
  click('#answer-1 .comment-form input[type="submit"]');

  andThen(function() {
    equal(find('#answer-1 .comment-list .comment').length,
      initialCommentCount + 1, 'Comment added to feed');
    ok(hasContent('Comment created succesfully!'),
      'Success message displayed');
  });
});

test('posting a comment requires authentication', function() {
  invalidateSession();
  visit('/questions/1');

  andThen(function() {
    equal(find('#answer-1 .add-comment').length, 0,
      'Question comment form is not displayed');
  });
});

test('user cannot submit an invalid comment', function() {
  authenticateSession();
  visit('/questions/1');

  click('#answer-1 .add-comment');

  andThen(function() {
    equal(find('#answer-1 input[type="submit"]').attr('disabled'), 'disabled',
      'Comment submit button is disabled');
  });
});
