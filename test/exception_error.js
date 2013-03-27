var assert = require('assert');
var domainit = require('../');
var called = false;

domainit(function (cb) {
  throw new Error('Exception!');
})(function (err) {
  called = true;
  assert(err);
  assert(err.message === 'Exception!');
});

process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});
