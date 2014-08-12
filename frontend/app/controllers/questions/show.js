import Ember from 'ember';
import PostControllerMixin from '../../mixins/post-controller';

export default Ember.ObjectController.extend(
  Ember.Validations.Mixin,
  PostControllerMixin, {

  postType: 'question',
  postActionText: 'asked',

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    },
    title: {
      length: { minimum: 15, maximum: 150 }
    }
  }
});
