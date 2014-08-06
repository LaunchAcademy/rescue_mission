import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  commentable: Ember.computed.alias('parentController.model'),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  actions: {
    submit: function() {
      var commentable = this.get('commentable');
      var comment = this.get('model');
      var _this = this;

      comment.set('commentable', commentable);

      comment.save().then(function() {
        commentable.get('comments').pushObject(comment);
        _this.wuphf.success('Comment created succesfully!', 3000);

        var newComment= _this.store.createRecord('comment');
        _this.set('model', newComment);
      }, function() {
        _this.wuphf.danger('There was an issue with your comment. Please try again.', 3000);
      });
    }
  }
});
