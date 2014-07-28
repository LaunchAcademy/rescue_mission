import Ember from 'ember';

var Router = Ember.Router.extend({
  location: RescueMissionENV.locationType
});

Router.map(function() {
  this.resource('questions', function() {
    this.route('show', { path: ':id' });
  });

  this.route('login');
});

export default Router;
