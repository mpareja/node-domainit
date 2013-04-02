var assert = require('assert');
var domainit = require('../');
var called = false;
var wrongDomain = 0;

// Test that domainit lets errors in handlers bubble up to parent domain
//
//
var domain = require('domain');
var d = domain.create();

function errHandler(err) {
  called = true;
  assert(err);
  assert(err.message === 'Error in handler!');
}

function exit() {
  if (wrongDomain > 0) {
    console.log('WRONG DOMAIN');
    process.exit(1);
  }
  else if (!called) {
    console.log('ERROR NOT CALLED');
    process.exit(1);
  }
}

function run() {
  domainit(function (cb) {
    cb(null);
  })(function (err) {
    wrongDomain += domain.active === d ? 0 : 1;
    throw new Error('Error in handler!');
  });
}

d.on('error', errHandler);
process.on('exit', exit);

d.run(run);

