import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Editing a Question Comment', {
  setup: function() {
    App = startApp();

    var question = {
      id: 1,
      comment_ids: [1, 2]
    };

    var comments = [
      {
        id: 1,
        body: 'This comment is editable. Go ahead and edit.',
        commentable_id: 1,
        commentable_type: 'Question',
        can_edit: true
      },
      {
        id: 2,
        body: 'This comment cannot be edited. Try your hardest.',
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
  var newBody = 'This is the edited content for the comment body';

  // Successful response
  server.put('/api/v1/comments/1', function(request) {
    var comment = {
      id: 1,
      body: newBody,
      commentable_id: 1,
      commentable_type: 'Question',
      can_edit: true
    };

    return jsonResponse(200, { comment: comment });
  });

  authenticateSession();
  visit('/questions/1');

  var initialCommentCount;
  andThen(function() {
    initialCommentCount = find('.question .comment-list .comment').length;
  });

  click('#comment-1 .comment-actions__edit');
  fillIn('#comment-1 textarea[name="body"]', newBody);
  click('#comment-1 input[type="submit"]');

  andThen(function() {
    equal(find('#comment-1:contains(' + newBody +')').length, 1,
      'Comment was updated');
    equal(find('.question .comment-list .comment').length, initialCommentCount,
      'No new comments were added to the list');
  });
});

test('user cannot submit an invalid comment', function() {
  authenticateSession();
  visit('/questions/1');

  click('#comment-1 .comment-actions__edit');
  fillIn('#comment-1 textarea[name="body"]', '');

  andThen(function() {
    equal(find('.question .comment-form input[type="submit"]').attr('disabled'), 'disabled',
      'Comment submit button is disabled');
  });
});
