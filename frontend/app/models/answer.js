import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Validations.Mixin, {
  question: DS.belongsTo('question', { async: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  }
});
