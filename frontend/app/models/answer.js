import DS from 'ember-data';
import Commentable from './commentable';

export default Commentable.extend({
  question: DS.belongsTo('question', {
    async: true,
    inverse: 'answers'
  }),
  user: DS.belongsTo('user', { async: true }),

  body: DS.attr('string'),
  canEdit: DS.attr('boolean', { defaultValue: false }),
  isAccepted: DS.attr('boolean', { defaultValue: false })
});
