import Ember from 'ember';
import PostControllerMixin from 'rescue-mission/mixins/post-controller';

module('PostControllerMixin');

// Replace this with your real tests.
test('it works', function() {
  var PostControllerObject = Ember.Object.extend(PostControllerMixin);
  var subject = PostControllerObject.create();
  ok(subject);
});
