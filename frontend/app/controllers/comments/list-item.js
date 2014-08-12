import Ember from 'ember';
import PostControllerMixin from '../../mixins/post-controller';

export default Ember.ObjectController.extend(
  Ember.Validations.Mixin,
  PostControllerMixin, {

  isCommentable: false,
  postType: 'comment',
  postActionText: 'commented',

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  }
});
