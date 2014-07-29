import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:questions/show', 'QuestionsShowController');

test('isEditingTitle defaults to false', function() {
  var controller = this.subject();
  equal(controller.get('isEditingTitle'), false);
});

test('#editTitle', function() {
  var controller = this.subject();
  var question = Ember.Object.create({ title: 'Title from the question' });
  controller.set('model', question);

  // Initial state
  equal(controller.get('isEditingTitle'), false, 'isEditingTitle starts as false');
  equal(controller.get('newTitle'), null, 'newTitle starts as undefined');

  Ember.run(function() {
    controller.send('editTitle');
  });

  // Editing state
  equal(controller.get('isEditingTitle'), true, 'isEditingTitle changes to true');
  equal(controller.get('newTitle'), 'Title from the question',
    'newTitle is set to the current title of the question');
});

test('#cancelEditTitle', function() {
  expect(3);

  var controller = this.subject();
  var Question = Ember.Object.extend({
    rollback: function() {
      ok(true, 'Question was rolled back!');
    }
  });
  var question = Question.create({ title: 'Title from the question' });

  controller.set('model', question);
  controller.set('isEditingTitle', true);

  controller.send('cancelEditTitle');

  // Final state
  equal(controller.get('isEditingTitle'), false, 'isEditingTitle set to false');
  equal(controller.get('newTitle'), null, 'newTitle set to undefined');
});

test('#saveTitle', function() {
  expect(4);

  var controller = this.subject();
  var Question = Ember.Object.extend({
    save: function() {
      ok(true, 'Question was saved!');
      return new Ember.RSVP.resolve();
    }
  });
  var question = Question.create({ title: 'Title from the question' });

  controller.set('model', question);
  controller.set('isEditingTitle', true);
  controller.set('newTitle', 'Awesome new title');

  Ember.run(function() {
    controller.send('saveTitle');
  });

  // Final state
  equal(controller.get('model.title'), 'Awesome new title',
    'Question has the new title');
  equal(controller.get('isEditingTitle'), false, 'isEditingTitle set to false');
  equal(controller.get('newTitle'), null, 'newTitle set to undefined');
});

test('#editBody', function() {
  var controller = this.subject();
  var question = Ember.Object.create({ body: 'Body from the question' });
  controller.set('model', question);

  // Initial state
  equal(controller.get('isEditingBody'), false, 'isEditingBody starts as false');
  equal(controller.get('newBody'), null, 'newBody starts as undefined');

  Ember.run(function() {
    controller.send('editBody');
  });

  // Editing state
  equal(controller.get('isEditingBody'), true, 'isEditingBody changes to true');
  equal(controller.get('newBody'), 'Body from the question',
    'newBody is set to the current body of the question');
});

test('#cancelEditBody', function() {
  expect(3);

  var controller = this.subject();
  var Question = Ember.Object.extend({
    rollback: function() {
      ok(true, 'Question was rolled back!');
    }
  });
  var question = Question.create({ body: 'Body from the question' });

  controller.set('model', question);
  controller.set('isEditingBody', true);

  controller.send('cancelEditBody');

  // Final state
  equal(controller.get('isEditingBody'), false, 'isEditingBody set to false');
  equal(controller.get('newBody'), null, 'newBody set to undefined');
});

test('#saveBody', function() {
  expect(4);

  var controller = this.subject();
  var Question = Ember.Object.extend({
    save: function() {
      ok(true, 'Question was saved!');
      return new Ember.RSVP.resolve();
    }
  });
  var question = Question.create({ body: 'Body from the question' });

  controller.set('model', question);
  controller.set('isEditingBody', true);
  controller.set('newBody', 'Awesome new body');

  Ember.run(function() {
    controller.send('saveBody');
  });

  // Final state
  equal(controller.get('model.body'), 'Awesome new body',
    'Question has the new body');
  equal(controller.get('isEditingBody'), false, 'isEditingBody set to false');
  equal(controller.get('newBody'), null, 'newBody set to undefined');
});
