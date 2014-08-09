import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Validations.Mixin, {
  commentable: DS.belongsTo('commentable', { polymorphic: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),

  validations: {
    body: {
      length: { minimum: 30, maximum: 10000 }
    }
  },
});
