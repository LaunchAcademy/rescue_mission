import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  isEditing: false,

  itemId: function() {
    return 'comment-' + this.get('id');
  }.property('id'),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    save: function() {
      var comment = this.get('model');
      var _this = this;

      comment.save().then(function() {
        _this.set('isEditing', false);
      }, function() {
        _this.wuphf.danger('Something went wrong. Please try again.', 3000);
      });
    }
  }
});
