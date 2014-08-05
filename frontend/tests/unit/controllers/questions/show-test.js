import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:questions/show', 'QuestionsShowController');

test('isEditing defaults to false', function() {
  var controller = this.subject();
  equal(controller.get('isEditing'), false);
});

test('Action: #save', function() {
  expect(2);

  var controller = this.subject();
  var question = Ember.Object.create({
    save: function() {
      ok(true, 'Question was saved!');
      return new Ember.RSVP.resolve();
    }
  });

  controller.set('model', question);
  controller.set('isEditing', true);

  Ember.run(function() {
    controller.send('save');
  });

  equal(controller.get('isEditing'), false, 'No longer in isEditing state');
});
