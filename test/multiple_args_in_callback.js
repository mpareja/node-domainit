var assert = require('assert');
var domainit = require('../');

var unsafe = function (cb) {
  cb(null, 'hello', 'jello');
};

process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});

var safe = domainit(unsafe);
safe(function (err, a, b) {
  called = true;
  assert(a === 'hello');
  assert(b === 'jello');
  if (err) { throw err; }
});

