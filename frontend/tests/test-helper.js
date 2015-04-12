import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

window.hasContent = function(content) {
  return !!find('*:contains(' + content + ')').length;
};

window.jsonResponse = function(statusCode, content) {
  return [
    statusCode,
    {"Content-Type": "application/json"},
    JSON.stringify(content)
  ];
};
