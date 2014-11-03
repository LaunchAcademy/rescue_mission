import DS from 'ember-data';

export default DS.Model.extend({
  answers: DS.hasMany('answer', { async: true }),
  assignedQuestions: DS.hasMany('question', {
    async: true,
    inverse: 'assignee'
  }),
  questions: DS.hasMany('question', {
    async: true,
    inverse: 'user'
  }),

  avatarUrl: DS.attr('string'),
  username: DS.attr('string')
});
