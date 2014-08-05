import DS from 'ember-data';

export default DS.Model.extend({
  questions: DS.hasMany('question', { async: true }),
  answers: DS.hasMany('answer', { async: true }),

  username: DS.attr('string')
});
