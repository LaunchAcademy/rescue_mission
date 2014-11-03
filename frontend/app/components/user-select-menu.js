import Ember from 'ember';

export default Ember.Component.extend({
  isActive: false,
  selectedUser: null,
  users: [],

  fetchUsers: function() {
    var results = this.get('store').find('user', { role: 'admin' });
    this.set('users', results);
  },

  actions: {
    toggleIsActive: function() {
      if (this.get('isActive')) {
        this.set('isActive', false);
      } else {
        this.set('isActive', true);
        this.fetchUsers();
      }
    },

    select: function(user) {
      this.set('selectedUser', user);
      this.set('isActive', false);
      this.sendAction('action', user);
    }
  }
});
