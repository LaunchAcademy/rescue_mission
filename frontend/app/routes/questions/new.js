import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.createRecord('question');
  },

  actions: {
    save: function() {
      var _this = this;
      var model = this.currentModel;

      model.save().then(function() {
        _this.wuphf.success('Thanks for asking!', 3000);
        _this.transitionTo('questions.show', model);
      }, function() {
        _this.wuphf.danger('There were some errors with your question.', 3000);
      });
    },

    cancel: function() {
      this.transitionTo('questions.index');
    },

    willTransition: function() {
      var model = this.get('controller.model');

      if (model.get('isNew')) {
        model.deleteRecord();
      }
    }
  }
});
