import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('questions', function() {
    this.route('show', { path: ':question_id' });
    this.route('new');
  });

  this.route('login');
  this.route('help');
});
