var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var domainit = require('../');
var called = false;

process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});

domainit(function () {
  var emitter = new EventEmitter();
  emitter.emit('error', new Error('Error event!'));
})(function (err) {
  called = true;
  assert(err);
  assert(err.message === 'Error event!');
});
