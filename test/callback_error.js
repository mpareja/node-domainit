var assert = require('assert');
var domainit = require('../');
var called = false;

process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});

domainit(function (cb) {
  cb(new Error('Callback!'));
})(function (err) {
  called = true;
  assert(err);
  assert(err.message === 'Callback!');
});
