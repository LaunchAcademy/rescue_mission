import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.belongsTo('question', { polymorphic: true, async: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false })
});
