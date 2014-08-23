import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['height', 'src', 'width'],

  height: Ember.computed.oneWay('size'),
  size: '48',
  user: null,
  width: Ember.computed.oneWay('size'),

  src: function() {
    var avatarUrl = this.get('user.avatarUrl');

    if (avatarUrl) {
      return avatarUrl + '?size=' + this.get('size');
    } else {
      return '';
    }
  }.property('user.avatarUrl', 'size')
});
