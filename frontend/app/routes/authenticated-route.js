import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.wuphf.danger('You need to log in before you can do that.', 3000);
    }

    this._super(transition);
  }
});
