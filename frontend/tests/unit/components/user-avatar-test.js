import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('user-avatar', 'UserAvatarComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  assert.equal(component.state, 'inDOM');
});
