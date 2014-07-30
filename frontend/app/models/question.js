import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),
});
