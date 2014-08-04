import Ember from 'ember';

export default Ember.Component.extend(Ember.Validations.Mixin, {
  validations: {
    body: {
      length: { minimum: 15, maximum: 10000 }
    }
  },

  setCommentable: function() {
    debugger;
    var comment = this.store.createRecord('comment');
    this.set('comment', comment);
  }.on('init')
});
