var assert = require('assert');
var domainit = require('../');
var called = false;

function unsafe(cb) {
  process.nextTick(function () {
    throw new Error('Oops!');
  });
}

var safe = domainit(unsafe);
safe(function (err) {
  assert(err);
  assert(err.message === 'Oops!');
  called = true;
});

process.on('exit', function () {
  assert(called);
});
