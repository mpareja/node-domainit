var assert = require('assert');
var domainit = require('../');

var unsafe = function (a, b, cb) {
  assert(a === 'mya');
  assert(b === 'myb');
  cb(null);
};

process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});

var safe = domainit(unsafe);
safe('mya', 'myb', function (err) {
  called = true;
  if (err) { throw err; }
});

