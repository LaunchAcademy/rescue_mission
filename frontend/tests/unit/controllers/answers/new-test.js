import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:answers/new', 'AnswersNewController', {
  needs: ['controller:questions/show']
});

test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
