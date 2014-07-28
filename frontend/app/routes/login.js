import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticate: function(provider){
      this.get('session').authenticate('authenticator:torii-oauth2', {
        torii: this.get('torii'),
        provider: provider
      }, function(error) {
        alert('There was an error when trying to sign you in: ' + error);
      });
    }
  }
});
