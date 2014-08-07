import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(input) {
  input = input || '';
  var html = marked(input);

  return new Ember.Handlebars.SafeString(html);
});
