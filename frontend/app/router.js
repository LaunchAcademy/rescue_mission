import Ember from 'ember';

var Router = Ember.Router.extend({
  location: RescueMissionENV.locationType
});

Router.map(function() {
  this.resource('questions', function() {
    this.route('new');
  });
});

export default Router;
