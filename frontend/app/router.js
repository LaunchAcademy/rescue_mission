import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('questions', function() {
    this.route('show', { path: ':id' });
    this.route('new');
  });

  this.route('login');
  this.route('help');
});

export default Router;
