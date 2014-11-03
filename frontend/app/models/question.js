import DS from 'ember-data';
import Commentable from './commentable';

export default Commentable.extend({
  answers: DS.hasMany('answer', { async: true }),
  assignee: DS.belongsTo('user', {
    async: true,
    inverse: 'assignedQuestions'
  }),
  user: DS.belongsTo('user', {
    async: true,
    inverse: 'questions'
  }),

  body: DS.attr('string'),
  canAssign: DS.attr('boolean', { defaultValue: false }),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  title: DS.attr('string'),
});
