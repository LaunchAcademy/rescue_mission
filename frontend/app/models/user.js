import DS from 'ember-data';

export default DS.Model.extend({
  questions: DS.hasMany('question', { async: true }),
  answers: DS.hasMany('answer', { async: true }),

  avatarUrl: DS.attr('string'),
  username: DS.attr('string')
});
