import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page:   { refreshModel: true },
    status: { refreshModel: true }
  },

  model: function(params) {
    return this.store.find('question', params);
  },

  resetController: function (controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
  }
});
