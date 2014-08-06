import { test, moduleForModel } from 'ember-qunit';

moduleForModel('answer', 'Answer', {
  needs: ['model:comment', 'model:question', 'model:user']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
