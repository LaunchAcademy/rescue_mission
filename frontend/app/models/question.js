import DS from 'ember-data';
import Commentable from './commentable';

export default Commentable.extend({
  acceptedAnswer: DS.belongsTo('answer', {
    async: true
  }),
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
  canAcceptAnswer: DS.attr('boolean', { defaultValue: false }),
  canAssign: DS.attr('boolean', { defaultValue: false }),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  status: DS.attr('string'),
  title: DS.attr('string'),

  isAnswered: function() {
    return this.get('status') === 'answered';
  }.property('status')
});
