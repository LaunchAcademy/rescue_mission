import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

// Commented out to allow for pushObject for polymorphic associations.
// Not sure what the downsides of this are.
// Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'rescue-mission', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'rescue-mission');

export default App;
