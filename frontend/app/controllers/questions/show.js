import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  isCommenting: false,
  isEditing: false,

  validations: {
    title: {
      length: { minimum: 15, maximum: 150 }
    },
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  actions: {
    toggleIsEditing: function() {
      this.toggleProperty('isEditing');
    },

    save: function() {
      var _this = this;
      var model = this.get('model');

      model.save().then(function() {
        _this.set('isEditing', false);
      });
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    addComment: function() {
      this.set('isCommenting', true);
    }
  }
});
