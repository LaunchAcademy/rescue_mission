import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
  canBeAccepted: false,
  isEditing: false,

  actions: {
    edit() {
      set(this, 'isEditing', true);
    },

    cancelEdit() {
      const answer = get(this, 'answer');

      answer.rollback();

      set(this, 'isEditing', false);
    }
  }
});
