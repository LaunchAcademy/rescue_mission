import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('question', 'Question', {
  needs: ['model:answer', 'model:comment', 'model:user']
});

test('canEdit defaults to false', function() {
  var question = this.subject();

  equal(question.get('canEdit'), false);
});

test('canEdit can be set to true', function() {
  var question = this.subject();

  Ember.run(function() {
    question.set('canEdit', true);
  });

  equal(question.get('canEdit'), true);
});
