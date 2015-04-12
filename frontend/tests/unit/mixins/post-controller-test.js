import Ember from 'ember';
import {module, test} from 'qunit';
import PostControllerMixin from 'rescue-mission/mixins/post-controller';

module('PostControllerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PostControllerObject = Ember.Object.extend(PostControllerMixin);
  var subject = PostControllerObject.create();
  assert.ok(subject);
});
