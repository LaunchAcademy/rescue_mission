import Ember from 'ember';
import DS from 'ember-data';
import Commentable from './commentable';

export default Commentable.extend(Ember.Validations.Mixin, {
  user: DS.belongsTo('user', { async: true }),
  answers: DS.hasMany('answer', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),

  validations: {
    title: {
      length: { minimum: 15, maximum: 150 }
    },
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },
});
