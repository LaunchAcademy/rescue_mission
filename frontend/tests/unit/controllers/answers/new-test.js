import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:answers/new', 'AnswersNewController', {
  needs: ['controller:questions/show']
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});
