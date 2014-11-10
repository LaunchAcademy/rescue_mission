import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'answers/list-item',
  sortProperties: ['isAccepted'],
  sortAscending: false
});
