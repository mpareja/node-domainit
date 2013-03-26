var assert = require('assert');
var domainit = require('../');
var called = false;

// Test that domainit lets errors in handlers bubble up to parent domain

process.on('uncaughtException', function(e) {
  called = true;
  assert(e.message === 'Error in handler!');
});

process.on('exit', function () {
  if (!called) {
    console.log('Handler not called.');
    process.exit(1);
  }
});

domainit(function (cb) {
  cb(new Error('Callback!'));
}, function (err) {
  throw new Error('Error in handler!');
});



// HERE: test that domain executes function on a later tick
