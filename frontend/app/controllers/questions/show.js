import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditingTitle: false,
  newTitle: null,

  actions: {
    editTitle: function() {
      this.set('isEditingTitle', true);
      this.set('newTitle', this.get('title'));
    },

    cancelEditTitle: function() {
      this.set('isEditingTitle', false);
      this.get('model').rollback();
      this.set('newTitle', null);
    },

    saveTitle: function() {
      var _this = this;
      var question = this.get('model');
      question.set('title', this.get('newTitle'));

      question.save().then(function() {
        _this.set('isEditingTitle', false);
        _this.set('newTitle', null);
      }, function() {
        // necessary for errors to be displayed
      });
    }
  }
});
