var domain = require('domain');
module.exports = function (fn) {
  var d = domain.create(), callback = null, error = null, results = null;

  d.on('error', function (err) {
    error = err;
    d.dispose();
  });
  d.on('dispose', function () {
    if (results && results.length > 0) {
      callback.apply(null, [error].concat(results));
    } else {
      callback(error);
    }
  });
  return function () {
    var allArgs = Array.prototype.slice.call(arguments, 0);

    // generate callback which is executed in the caller's domain, if one exists
    var cb = allArgs.slice(-1)[0]; // strip args
    var active = domain.active;
    callback = active ? wrapToRunInDomain(cb, active) : cb;

    // next, we'll pass original parameters except with our own callback
    var args = allArgs.slice(0, -1);
    args.push(function (err) {
      error = err;
      results = Array.prototype.slice.call(arguments, 1);
      d.dispose();
    });

    try {
      d.run(function () {
        fn.apply(null, args);
      });
    } catch (e) {
      error = e;
      d.dispose();
    }
  };
};

function wrapToRunInDomain(fn, domain) {
  return function (err, result) {
    domain.run(function () {
      var args = Array.prototype.slice.call(arguments, 0);
      fn.apply(null, args);
    });
  };
}
