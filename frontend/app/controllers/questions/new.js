import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  validations: {
    title: {
      length: { minimum: 15, maximum: 150 }
    },
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  }
});
