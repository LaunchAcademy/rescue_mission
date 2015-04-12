import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, server;

module('Acceptance: Questions Index', {
  beforeEach: function() {
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
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('links to all questions are listed', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Such a good question")').length, 1);
    assert.equal(find('a:contains("really bad question")').length, 1);
    assert.equal(find('a:contains("help me please")').length, 1);
  });
});
