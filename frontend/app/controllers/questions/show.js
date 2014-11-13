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
  },

  actions: {
    assignUser: function(user) {
      this.set('assignee', user);
      this.send('save');
    },

    toggleAcceptedAnswer: function(answer) {
      var _this = this;

      this.get('acceptedAnswer').then(function(acceptedAnswer) {
        if (acceptedAnswer === answer) {
          _this.set('acceptedAnswer', null);
        } else {
          _this.set('acceptedAnswer', answer);
        }

        _this.send('save');
      });
    }
  }
});
