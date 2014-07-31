import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  needs: ['questions/show'],
  question: Ember.computed.alias("controllers.questions/show"),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },

  actions: {
    save: function() {
      var question = this.get('question.model');
      var answer = this.get('model');
      var _this = this;

      answer.set('question', question);

      answer.save().then(function() {
        question.get('answers').pushObject(answer);
        _this.wuphf.success('Thanks for answering!', 3000);

        var newAnswer = _this.store.createRecord('answer');
        _this.set('model', newAnswer);
      });
    }
  }
});
