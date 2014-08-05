import DS from 'ember-data';

export default DS.Model.extend({
  commentable: DS.belongsTo('commentable', { polymorphic: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false })
});
