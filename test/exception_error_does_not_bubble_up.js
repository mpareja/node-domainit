var assert = require('../assert');
var domainit = require('../');
var called = 0;

process.on('exit', function () {
  assert(called === 1, 'Handler not called once: ' + called);
});

var safe = domainit(function (cb) {
  throw new Error('Exception!');
});

try {
  safe(function (err) {
    called++;
    assert(err && err.message === 'Exception!', 'Not the expected error: ' + err);
  });
} catch (e) {
  assert(false, 'Exception bubbled up!');
}

