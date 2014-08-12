import Ember from 'ember';

export default Ember.Mixin.create({
  isCommentable: true,
  isCommenting: false,

  isEditing: false,

  postActionText: null,
  postType: null,

  postClass: function() {
    return 'post--' + this.get('postType');
  }.property('postType'),

  postEditPartial: function() {
    return this.get('postType') + 's/edit';
  }.property('postType'),

  postId: function() {
    return this.get('postType') + '-' + this.get('model.id');
  }.property('model.id', 'postType'),

  actions: {
    addComment: function() {
      this.set('isCommenting', true);
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    edit: function() {
      this.set('isEditing', true);
    },

    save: function() {
      var model = this.get('model');
      var _this = this;

      model.save().then(function() {
        _this.set('isEditing', false);
      }, function() {
        _this.wuphf.danger('Something went wrong. Please try again.', 3000);
      });
    }
  }
});
