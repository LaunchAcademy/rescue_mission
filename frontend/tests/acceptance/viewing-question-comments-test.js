import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Viewing Question Comments', {
  beforeEach: function() {
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
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('all comments for question are displayed', function(assert) {
  visit('/questions/1');

  andThen(function() {
    assert.equal(find('#question-1 .post--comment').length, 2, 'Correct number of comments are listed');
    assert.equal(find('.post__content:contains("You should just rm -rf *. That should fix it.")').length, 1,
      'First comment found');
    assert.equal(find('.post__content:contains("I actually solved this myself by derping the derp")').length, 1,
      'Second comment found');
  });
});
