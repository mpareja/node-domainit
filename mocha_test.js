var assert = require('assert');
var domainit = require('./');
var semver = require('semver');

describe('domainit', function () {
  it('traps sync errors', function (done) {
    var unsafe = function (cb) {
      throw new Error('unsafe');
    };

    var safe = domainit(unsafe);
    safe(function (err) {
      assert(err.message === 'unsafe');
      done();
    });
  });

  // this will fail in node < 0.9.5
  if (semver.satisfies(process.version, '>=0.9.5')) {
    it('traps async errors', function (done) {
      var unsafe = function (cb) {
        process.nextTick(function () {
          throw new Error('unsafe');
        });
      };

      var safe = domainit(unsafe);
      safe(function (err) {
        assert(err.message === 'unsafe');
        done();
      });
    });
  }
});

