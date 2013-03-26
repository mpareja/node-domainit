var assert = require('assert');
var domainit = require('../');
var called = false;

// Test that domainit lets errors in handlers bubble up to parent domain
//
//
var domain = require('domain');
var d = domain.create();

d.on('error', function () {
  called = true;
  d.dispose();
});

d.run(function () {
  domainit(function (cb) {
    cb(new Error('Callback!'));
  }, function (err) {
    throw new Error('Error in handler!');
  });
});


process.on('exit', function () {
  if (!called) {
    throw new Error('Handler not called.');
    process.exit(1);
  }
});
