import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Questions Index', {
  setup: function() {
    App = startApp();

    var questions = [
      {
        id: 10,
        title: 'Such a good question'
      },
      {
        id: 42,
        title: 'really bad question'
      },
      {
        id: 3,
        title: 'help me please'
      }
    ];

    server = new Pretender(function(){
      this.get('/api/v1/questions', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify({questions: questions})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('links to all questions are listed', function() {
  visit('/');

  andThen(function() {
    equal(find('a:contains("Such a good question")').length, 1);
    equal(find('a:contains("really bad question")').length, 1);
    equal(find('a:contains("help me please")').length, 1);
  });
});
