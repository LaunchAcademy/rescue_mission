import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  title: DS.attr('string')
});
