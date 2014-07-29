import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Questions Show', {
  setup: function() {
    App = startApp();

    var user = {
      id: 12,
      username: 'HeroicEric',
      question_ids: [42]
    };

    var question = {
      id: 42,
      user_id: 12,
      title: 'really bad question title',
      body: 'I write the worst questions'
    };

    server = new Pretender(function(){
      this.get('/api/v1/questions/:id', function(request) {
        return jsonResponse(200, { question: question });
      });

      this.get('/api/v1/users/:id', function(request) {
        return jsonResponse(200, { user: user });
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('the correct information is displayed', function() {
  visit('/questions/42');

  andThen(function() {
    equal(find('.page-title:contains("really bad question")').length, 1,
      'Title found');
    ok(hasContent('asked by HeroicEric'), 'Author found');
    ok(hasContent('I write the worst questions'), 'Body found');
  });
});
