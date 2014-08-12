import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Commenting on a Question', {
  setup: function() {
    App = startApp();

    var question = {
      id: 1,
      comment_ids: [1, 2]
    };

    var comments = [
      {
        id: 1,
        body: 'You should just rm -rf *. That should fix it.',
        commentable_id: 1,
        commentable_type: 'Question'
      },
      {
        id: 2,
        body: 'I actually solved this myself by derping the derp',
        commentable_id: 1,
        commentable_type: 'Question'
      }
    ];

    server = new Pretender(function(){
      this.get('/api/v1/questions/1', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify({question: question, comments: comments})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('user successfully comments on a question', function() {
  server.post('/api/v1/comments', function(request) {
    var commentResponse = {
      id: 99,
      body: 'Can you create a jsbin that recreates your issue?',
      commentable_id: 1,
      commentable_type: 'Question'
    };

    return jsonResponse(201, { comment: commentResponse });
  });

  authenticateSession();
  visit('/questions/1');

  var initialCommentCount;
  andThen(function() {
    initialCommentCount = find('#question-1 .post--comment').length;
  });

  click('#question-1 .add-comment');
  fillIn('#question-1 .comment-form textarea[name="body"]',
    'Can you create a jsbin that recreates your issue?');
  click('#question-1 .comment-form input[type="submit"]');

  andThen(function() {
    equal(find('#question-1 .post--comment').length,
      initialCommentCount + 1, 'Comment added to feed');
    ok(hasContent('Comment created succesfully!'),
      'Success message displayed');
  });
});

test('posting a comment requires authentication', function() {
  invalidateSession();
  visit('/questions/1');

  andThen(function() {
    equal(find('#question-1 .add-comment').length, 0,
      'Question comment form is not displayed');
    equal(find('a:contains("Log in to post a comment")').length, 1,
      'Message to sign in to post comment displayed');
  });
});

test('user cannot submit an invalid comment', function() {
  authenticateSession();
  visit('/questions/1');

  click('#question-1 .add-comment');

  andThen(function() {
    equal(find('#question-1 .comment-form input[type="submit"]').first().attr('disabled'), 'disabled',
      'Comment submit button is disabled');
  });
});
