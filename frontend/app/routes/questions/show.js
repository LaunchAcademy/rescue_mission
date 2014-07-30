import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.id);
  },

  actions: {
    didTransition: function() {
      this.get('controller').set('isEditing', false);
    }
  }
});
