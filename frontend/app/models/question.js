import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: true }),
  answers: DS.hasMany('answer', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),
  canAcceptAnswer: DS.attr('boolean', { defaultValue: false})
});
