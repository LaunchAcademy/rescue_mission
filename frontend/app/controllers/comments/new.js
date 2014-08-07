import Ember from 'ember';

export default Ember.Controller.extend(Ember.Validations.Mixin, {
  commentable: Ember.computed.alias('parentController.model'),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  actions: {
    submit: function() {
      var _this = this;
      var commentable = this.get('commentable');
      var comment = this.store.createRecord('comment', {
        commentable: commentable,
        body: this.get('body')
      });

      comment.save().then(function() {
        commentable.get('comments').pushObject(comment);
        _this.set('body', '');
        _this.parentController.set('isCommenting', false);
        _this.wuphf.success('Comment created succesfully!', 3000);
      }, function() {
        _this.wuphf.danger('There was an issue with your comment. Please try again.', 3000);
      });
    },

    cancel: function() {
      this.parentController.set('isCommenting', false);
    }
  }
});
