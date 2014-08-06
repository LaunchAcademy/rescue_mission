import { test, moduleForModel } from 'ember-qunit';

moduleForModel('comment', 'Comment', {
  needs: ['model:answer', 'model:commentable', 'model:question', 'model:user']
});

test('canEdit has default value of false', function() {
  var comment = this.subject();

  equal(comment.get('canEdit'), false, 'It defaults to false');
});
