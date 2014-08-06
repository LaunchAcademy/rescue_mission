import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('answer', this.store.createRecord('answer'));
    controller.set('comment', this.store.createRecord('comment'));
  },

  actions: {
    didTransition: function() {
      this.get('controller').set('isEditing', false);
    }
  }
});
