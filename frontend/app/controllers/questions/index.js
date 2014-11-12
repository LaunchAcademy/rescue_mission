import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['page', 'status'],
  page: 1,
  status: null,

  previousPageUnavailable: function() {
    return this.get('page') <= 1;
  }.property('page'),

  nextPageUnavailable: function() {
    return this.get('page') >= this.get('totalPages');
  }.property('page'),

  metadata: function() {
    return this.store.metadataFor('question');
  }.property(),

  totalPages: function() {
    return this.get('metadata.total_pages');
  }.property('metadata'),

  actions: {
    nextPage: function() {
      this.incrementProperty('page');
    },

    previousPage: function() {
      this.decrementProperty('page');
    }
  }
});
