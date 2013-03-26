var assert = require('assert');
var domainit = require('../');
var called = false;

var afterdomainit = false;
domainit(function (cb) {
  if (!afterdomainit) {
    throw new Error('Function called on same tick!');
  }
}, function (err) {
  if (err) { throw err; }
});
afterdomainit = true;

