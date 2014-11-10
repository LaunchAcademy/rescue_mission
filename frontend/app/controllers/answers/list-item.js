import Ember from 'ember';
import PostControllerMixin from '../../mixins/post-controller';

export default Ember.ObjectController.extend(
  Ember.Validations.Mixin,
  PostControllerMixin, {

  postType: 'answer',
  postActionText: 'answered',

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  canBeAccepted: function() {
    return this.get('question.canAcceptAnswer');
  }.property('question.canAcceptAnswer')
});
