import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.belongsTo('question', { async: true }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string')
});
