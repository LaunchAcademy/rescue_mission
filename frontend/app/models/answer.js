import Ember from 'ember';
import DS from 'ember-data';
import Commentable from './commentable';

export default Commentable.extend(Ember.Validations.Mixin, {
  question: DS.belongsTo('question', { async: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },
});
