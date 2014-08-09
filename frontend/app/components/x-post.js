import Ember from 'ember';

export default Ember.Component.extend({
  isCommenting: false,
  isEditing: false,
  type: null,

  itemId: function() {
    var type = this.get('type');
    var id = this.get('model.id');
    return type + '-' + id;
  }.property('model.id', 'type'),

  postClass: function() {
    return 'post--' + this.get('type');
  }.property('type'),

  postAction: function() {
    return this.get('type') + 'ed';
  }.property(),

  isCommentable: function() {
    return this.get('type') !== 'comment';
  }.property(),

  editPartial: function() {
    return this.get('type') + 's/edit';
  }.property(),

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    save: function() {
      var model = this.get('model');
      var _this = this;

      model.save().then(function() {
        _this.set('isEditing', false);
      }, function() {
        _this.wuphf.danger('Something went wrong. Please try again.', 3000);
      });
    },

    addComment: function() {
      this.set('isCommenting', true);
    }
  }
});
