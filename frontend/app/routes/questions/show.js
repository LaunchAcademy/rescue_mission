import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('answer', this.store.createRecord('answer'));
  },

  actions: {
    didTransition: function() {
      this.get('controller').set('isEditing', false);
    },

    saveAnswer: function() {
      var question = this.currentModel;
      var answer = this.controller.get('answer');
      var _this = this;

      answer.set('question', question);

      answer.save().then(function() {
        question.get('answers').pushObject(answer);
        _this.wuphf.success('Thanks for answering!', 3000);

        var newAnswer = _this.store.createRecord('answer');
        _this.controller.set('answer', newAnswer);
      });
    }
  }
});
