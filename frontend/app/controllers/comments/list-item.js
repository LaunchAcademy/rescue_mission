import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  itemId: function() {
    return 'answer-' + this.get('id');
  }.property('id')
});
